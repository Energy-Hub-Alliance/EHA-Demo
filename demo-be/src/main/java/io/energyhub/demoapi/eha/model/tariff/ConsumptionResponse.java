package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.constant.DocumentationExample;
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
    @Schema(description = "Date-time of start of consumption interval.", example = DocumentationExample.DATE)
    @JsonProperty(index = 3)
    private ZonedDateTime startDate;

    @NotNull
    @Schema(description = "Date-time of end of consumption interval.", example = DocumentationExample.END_DATE)
    @JsonProperty(index = 4)
    private ZonedDateTime endDate;

    @Schema(description = "The consumption in that interval in kWh.", example = "2.23")
    @JsonProperty(index = 1)
    private BigDecimal consumption;

    @Schema(description = "The cost of the consumption in that interval in the currency of the tariff.", example = "0.25")
    @JsonProperty(index = 2)
    private BigDecimal cost;

}
