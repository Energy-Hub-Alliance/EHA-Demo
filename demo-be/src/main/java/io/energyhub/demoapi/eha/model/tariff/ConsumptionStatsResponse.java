package io.energyhub.demoapi.eha.model.tariff;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ConsumptionStatsResponse {

    @NotNull
    @Schema(description = "Consumption today in kWh", example = "15.884")
    private BigDecimal today;

    @NotNull
    @Schema(description = "Consumption yesterday in kWh", example = "37.489")
    private BigDecimal yesterday;

    @NotNull
    @Schema(description = "Consumption last month in kWh", example = "1891.584")
    private BigDecimal lastMonth;

}
