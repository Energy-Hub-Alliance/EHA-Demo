package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.HvacMode;
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
    @JsonProperty(index = 2)
    private HvacMode mode;

    @Schema(description = "Indicates if the HVAC is on.", example = "true")
    @JsonProperty(index = 1)
    private Boolean isActive;

    @Schema(description = "The current temperature measured inside in °C.", example = "20.3")
    @JsonProperty(index = 3)
    private Double temperatureCurrent;

    @Schema(description = "The current temperature measured outside in °C.", example = "12.1")
    @JsonProperty(index = 4)
    private Double temperatureOutside;

    @Schema(description = "Object of temperature targets of the HVAC.")
    @JsonProperty(index = 5)
    private List<TemperatureTarget> temperatureTargets;

    @Schema(description = "The timestamp of the last update of the climate state data.")
    @NotNull
    @JsonProperty(index = 6)
    private LocalDateTime lastUpdated;
}
