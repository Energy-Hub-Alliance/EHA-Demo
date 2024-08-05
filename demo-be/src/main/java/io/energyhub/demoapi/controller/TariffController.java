package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.constant.ConsumptionPeriod;
import io.energyhub.demoapi.eha.client.EhaSmartEnergyApiClient;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.TariffSortRequest;
import io.energyhub.demoapi.eha.model.tariff.PriceResponse;
import io.energyhub.demoapi.eha.model.tariff.TariffResponse;
import io.energyhub.demoapi.model.ConsumptionPeriodResponse;
import io.energyhub.demoapi.model.ConsumptionStatsResponse;
import io.energyhub.demoapi.service.TariffConsumptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tariffs")
@RequiredArgsConstructor
@Tag(name = "Tariff Controller")
public class TariffController {

    private final EhaSmartEnergyApiClient ehaSmartEnergyApiClient;
    private final CurrentUser currentUser;
    private final TariffConsumptionService tariffConsumptionService;

    @Operation(summary = "All tariffs for user", description = "Returns a paginated list of all tariffs that belong to the user.")
    @GetMapping
    public PageResponse<TariffResponse> getAllTariffsByUserId(
            @ParameterObject @Valid TariffSortRequest request
    ) {
        return ehaSmartEnergyApiClient.getAllTariffsByUserId(currentUser.getCurrentUser().getUserId(), request);
    }

    @Operation(summary = "Tariff data for user", description = "Returns general data of a single tariff for the user.")
    @GetMapping("{tariffId}")
    public TariffResponse getTariffByUserIdAndTariffUuid(
            @Parameter(description = "Tariff ID") @PathVariable(name = "tariffId") UUID tariffUuid
    ) {
        return ehaSmartEnergyApiClient.getTariffByUserIdAndTariffUuid(currentUser.getCurrentUser().getUserId(), tariffUuid);
    }

    @Operation(summary = "Consumption for tariff and user",
            description = "Returns a paginated list of consumption of a tariff for the given period for the user.")
    @GetMapping("{tariffId}/consumption/{period}")
    public List<ConsumptionPeriodResponse> getConsumptionForPeriod(
            @Parameter(description = "Tariff ID") @PathVariable(name = "tariffId") UUID tariffUuid,
            @Parameter(description = "Consumption period") @PathVariable(name = "period") ConsumptionPeriod period,
            @Parameter(description = "Timezone", example = "Europe/Berlin") @RequestParam(value = "timezone", required = false, defaultValue = "UTC") String timezone
    ) {
        return tariffConsumptionService.getConsumptionForPeriod(currentUser.getCurrentUser().getUserId(), tariffUuid, period, timezone);
    }

    @Operation(summary = "Get consumption statistics for tariff and user",
            description = "Returns a consumption statistics of a tariff for the user.")
    @GetMapping("{tariffId}/consumption/stats")
    public ConsumptionStatsResponse getConsumptionStats(
            @Parameter(description = "Tariff ID") @PathVariable(name = "tariffId") UUID tariffUuid,
            @Parameter(description = "Timezone", example = "Europe/Berlin") @RequestParam(value = "timezone", required = false, defaultValue = "UTC") String timezone
    ) {
        return tariffConsumptionService.getConsumptionStats(currentUser.getCurrentUser().getUserId(), tariffUuid, timezone);
    }

    @Operation(summary = "Prices for user", description = "Returns prices of a tariff for the user.")
    @GetMapping("{tariffId}/prices")
    public List<PriceResponse> getPricesByUserIdAndTariffId(
            @PathVariable @Parameter(description = "Tariff id") UUID tariffId) {

        return ehaSmartEnergyApiClient.getPricesByUserIdAndTariffId(currentUser.getCurrentUser().getUserId(), tariffId);
    }

    @Operation(summary = "Delete tariff for user", description = "Deletes the tariff for the user.")
    @DeleteMapping("{tariffId}")
    public SuccessMessageDto deleteTariff(
            @Parameter(description = "Tariff ID") @PathVariable(name = "tariffId") UUID tariffId) {
        return ehaSmartEnergyApiClient.deleteTariff(currentUser.getCurrentUser().getUserId(), tariffId);
    }
}
