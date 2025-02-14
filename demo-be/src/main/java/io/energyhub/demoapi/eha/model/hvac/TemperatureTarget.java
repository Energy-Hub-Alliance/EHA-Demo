package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.HvacMode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "Object of temperature target of HVAC device.")
public class TemperatureTarget {

    @Schema(description = "The mode of the temperature target.", example = "HEAT")
    @NotNull
    @JsonProperty(index = 1)
    private HvacMode mode;

    @Schema(description = "The target temperature set by the user in °C.", example = "18.1")
    @JsonProperty(index = 2)
    private Double temperature;
}
