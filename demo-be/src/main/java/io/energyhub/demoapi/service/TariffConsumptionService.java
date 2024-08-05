package io.energyhub.demoapi.service;

import io.energyhub.demoapi.constant.ConsumptionPeriod;
import io.energyhub.demoapi.eha.client.EhaSmartEnergyApiClient;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.tariff.ConsumptionResponse;
import io.energyhub.demoapi.model.ConsumptionPeriodResponse;
import io.energyhub.demoapi.model.ConsumptionStatsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.time.zone.ZoneRulesException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.HOURS;

@Service
@RequiredArgsConstructor
public class TariffConsumptionService {

    private final EhaSmartEnergyApiClient ehaSmartEnergyApiClient;

    /**
     * Resolve Timezone based on zone name.
     *
     * @param timezone Timezone name
     * @return {@link ZoneId}
     */
    private ZoneId resolveTimezone(String timezone) {
        if (timezone == null) {
            return ZoneId.of("UTC");
        }

        try {
            return ZoneId.of(timezone);
        } catch (ZoneRulesException exception) {
            return ZoneId.of("UTC");
        }
    }

    /**
     * Return aggregated consumption data based on selected interval period aligned for specific timezone.
     *
     * @param userId     ID of authenticated user
     * @param tariffUuid Tariff identification value
     * @param period     Desired consumption period {@link ConsumptionPeriod}
     * @param timezone   Timezone name
     * @return List of {@link ConsumptionPeriodResponse}
     */
    public List<ConsumptionPeriodResponse> getConsumptionForPeriod(String userId, UUID tariffUuid, ConsumptionPeriod period, String timezone) {
        ZoneId zoneId = resolveTimezone(timezone);
        LocalDateTime now = LocalDateTime.now(zoneId);

        int pageSize = calculatePageSize(period, now);
        PageResponse<ConsumptionResponse> ehaResponse = ehaSmartEnergyApiClient.getConsumptionByUserIdAndTariffUuid(userId, tariffUuid, 0, pageSize);
        List<ConsumptionResponse> ehaConsumption = ehaResponse.getContent();

        if (period == ConsumptionPeriod.TODAY) {
            return getHourlyConsumption(ehaConsumption, now, zoneId);
        }

        return getDailyConsumption(ehaConsumption, period, now, zoneId);
    }

    private int calculatePageSize(ConsumptionPeriod consumptionPeriod, LocalDateTime now) {
        LocalDate fromDate = switch (consumptionPeriod) {
            case TODAY -> now.toLocalDate();
            case WEEK -> now.toLocalDate().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
            case MONTH -> now.toLocalDate().with(TemporalAdjusters.firstDayOfMonth());
        };
        return (int) HOURS.between(fromDate.atStartOfDay(), now) + 1; // min size is 1
    }

    private List<ConsumptionPeriodResponse> getDailyConsumption(List<ConsumptionResponse> consumption, ConsumptionPeriod period,
                                                                LocalDateTime now, ZoneId zoneId) {
        Map<LocalDate, BigDecimal> consumptionPerDay = consumption
                .stream()
                .collect(Collectors.groupingBy(
                        x -> x.getStartDate().withZoneSameInstant(zoneId).toLocalDate(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                x -> x.getConsumption() != null ? x.getConsumption() : BigDecimal.ZERO,
                                BigDecimal::add
                        )));

        int listSize;
        LocalDate periodStart;
        LocalDate periodEnd;

        if (period == ConsumptionPeriod.WEEK) {
            listSize = 7;
            periodStart = now.toLocalDate().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
            periodEnd = now.toLocalDate().with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        } else {
            listSize = 31;
            periodStart = now.toLocalDate().with(TemporalAdjusters.firstDayOfMonth());
            periodEnd = now.toLocalDate().with(TemporalAdjusters.firstDayOfNextMonth()).minusDays(1);
        }

        List<ConsumptionPeriodResponse> consumptionList = new ArrayList<>(listSize);

        for (LocalDate day = periodStart; day.isBefore(periodEnd) || day.isEqual(periodEnd); day = day.plusDays(1)) {
            ConsumptionPeriodResponse consumptionDto = new ConsumptionPeriodResponse();
            consumptionDto.setStartDate(ZonedDateTime.of(day.atStartOfDay(), zoneId));
            consumptionDto.setEndDate(ZonedDateTime.of(day.atStartOfDay().plusDays(1), zoneId));
            consumptionDto.setConsumption(consumptionPerDay.getOrDefault(day, BigDecimal.ZERO));

            consumptionList.add(consumptionDto);
        }

        return consumptionList;
    }

    private List<ConsumptionPeriodResponse> getHourlyConsumption(List<ConsumptionResponse> consumption, LocalDateTime now, ZoneId zoneId) {
        Map<LocalDateTime, BigDecimal> consumptionPerHour = consumption
                .stream()
                .collect(Collectors.groupingBy(
                        x -> x.getStartDate().withZoneSameInstant(zoneId).toLocalDateTime().truncatedTo(ChronoUnit.HOURS),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                x -> x.getConsumption() != null ? x.getConsumption() : BigDecimal.ZERO,
                                BigDecimal::add
                        )));

        LocalDateTime startOfDay = now.with(LocalTime.MIN);
        LocalDateTime endOfDay = now.with(LocalTime.MAX);

        List<ConsumptionPeriodResponse> consumptionList = new ArrayList<>(24);

        for (LocalDateTime hour = startOfDay; hour.isBefore(endOfDay); hour = hour.plusHours(1)) {
            ConsumptionPeriodResponse consumptionDto = new ConsumptionPeriodResponse();
            consumptionDto.setStartDate(ZonedDateTime.of(hour, zoneId));
            consumptionDto.setEndDate(ZonedDateTime.of(hour.plusHours(1), zoneId));
            consumptionDto.setConsumption(consumptionPerHour.getOrDefault(hour, BigDecimal.ZERO));
            consumptionList.add(consumptionDto);
        }

        return consumptionList;
    }

    /**
     * Get consumption statistics for multiple periods at once.
     *
     * @param userId     ID of authenticated user
     * @param tariffUuid Tariff identification value
     * @param timezone   Timezone name
     * @return {@link ConsumptionStatsResponse}
     */
    public ConsumptionStatsResponse getConsumptionStats(String userId, UUID tariffUuid, String timezone) {
        ZoneId zoneId = resolveTimezone(timezone);
        LocalDate today = LocalDate.now(zoneId);
        LocalDate yesterday = today.minusDays(1);
        YearMonth previousMonth = YearMonth.from(today.minusMonths(1));

        PageResponse<ConsumptionResponse> ehaResponse = ehaSmartEnergyApiClient.getConsumptionByUserIdAndTariffUuid(userId, tariffUuid, 0, 2000);
        List<ConsumptionResponse> ehaConsumption = ehaResponse.getContent();

        BigDecimal todayConsumption = BigDecimal.ZERO;
        BigDecimal yesterdayConsumption = BigDecimal.ZERO;
        BigDecimal lastMonthConsumption = BigDecimal.ZERO;

        for (ConsumptionResponse consumptionResponse : ehaConsumption) {
            LocalDate localDate = consumptionResponse.getStartDate().toLocalDate();
            BigDecimal consumption = consumptionResponse.getConsumption() != null ? consumptionResponse.getConsumption() : BigDecimal.ZERO;

            if (localDate.equals(today)) {
                todayConsumption = todayConsumption.add(consumption);
            }

            if (localDate.equals(yesterday)) {
                yesterdayConsumption = yesterdayConsumption.add(consumption);
            }

            if (YearMonth.from(localDate).equals(previousMonth)) {
                lastMonthConsumption = lastMonthConsumption.add(consumption);
            }

        }

        ConsumptionStatsResponse consumptionStatsResponse = new ConsumptionStatsResponse();
        consumptionStatsResponse.setToday(todayConsumption);
        consumptionStatsResponse.setYesterday(yesterdayConsumption);
        consumptionStatsResponse.setLastMonth(lastMonthConsumption);

        return consumptionStatsResponse;
    }
}
