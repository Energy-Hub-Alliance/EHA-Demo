package io.energyhub.demoapi.eha.model.hvac;

import io.energyhub.demoapi.eha.model.enums.Mode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "Object of climate state of HVAC device.")
public class HvacClimateState {

    @Schema(description = "Indicates which mode is currently active.", example = "HEAT")
    @NotNull
    private Mode mode;

    @Schema(description = "Indicates if the HVAC is on.", example = "true")
    private Boolean isActive;

    @Schema(description = "The current temperature measured inside in °C.", example = "20.3")
    private Float temperatureCurrent;

    @Schema(description = "The current temperature measured outside in °C.", example = "12")
    private Float temperatureOutside;

    @Schema(description = "The target temperatures for various operating modes of HVAC device.")
    private List<TemperatureTarget> temperatureTargets;

    @Schema(description = "The timestamp of the last update of the climate state data.")
    @NotNull
    private LocalDateTime lastUpdated;
}
