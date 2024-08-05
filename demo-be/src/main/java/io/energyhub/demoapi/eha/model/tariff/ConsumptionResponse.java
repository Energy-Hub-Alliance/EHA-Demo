package io.energyhub.demoapi.eha.model.tariff;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionResponse {

    @NotNull
    @Schema(description = "Date-time of start of consumption interval.")
    private ZonedDateTime startDate;

    @NotNull
    @Schema(description = "Date-time of end of consumption interval.")
    private ZonedDateTime endDate;

    @Schema(description = "The consumption in that interval in kWh.", example = "2.23")
    private BigDecimal consumption;

    @Schema(description = "Price of in currency of tariff.", example = "0.25")
    private BigDecimal cost;

}
