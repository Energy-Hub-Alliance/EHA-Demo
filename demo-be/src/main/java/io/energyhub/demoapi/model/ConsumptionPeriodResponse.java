package io.energyhub.demoapi.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Data
public class ConsumptionPeriodResponse {

    @NotNull
    @Schema(description = "The timestamp of the start of the price interval.")
    private ZonedDateTime startDate;

    @NotNull
    @Schema(description = "The timestamp of the end of price interval.")
    private ZonedDateTime endDate;

    @NotNull
    @Schema(description = "The consumption in that interval in kWh.", example = "2.23")
    private BigDecimal consumption;

}
