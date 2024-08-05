package io.energyhub.demoapi.eha.model.hvac;

import io.energyhub.demoapi.eha.model.enums.Mode;
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
@Schema(description = "Object of temperature target of HVAC device.", name = "TemperatureTarget")
public class TemperatureTarget {

    @Schema(description = "Indicates which mode is currently active.", example = "HEAT")
    @NotNull
    private Mode mode;

    @Schema(description = "The target temperature set by the user in degrees °C.", example = "18")
    private Float temperature;
}