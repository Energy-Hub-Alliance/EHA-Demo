package io.energyhub.demoapi.eha.model.vehicle;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "Object of climate state of a vehicle.")
public class ClimateState implements Serializable {

    @Schema(description = "The timestamp of the last update of the climate state data.")
    @NotNull
    private LocalDateTime lastUpdated;

    @Schema(description = "Indicates if the climate control is on.", example = "true")
    private Boolean isClimateOn;

    @Schema(description = "Indicates if the battery heater is on.", example = "true")
    private Boolean isBatteryHeaterOn;

    @Schema(description = "The target temperature set by the user in °C.", example = "20")
    private Float temperatureTarget;

    @Schema(description = "The current temperature inside the vehicle in °C.", example = "18")
    private Float temperatureCurrent;
}
