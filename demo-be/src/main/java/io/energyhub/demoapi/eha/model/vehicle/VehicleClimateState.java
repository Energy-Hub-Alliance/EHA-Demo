package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "Object of climate state of a vehicle.")
public class VehicleClimateState {

    @Schema(description = "The timestamp of the last update of the climate state data.")
    @NotNull
    @JsonProperty(index = 5)
    private LocalDateTime lastUpdated;

    @Schema(description = "Indicates if the climate control is on.", example = "true")
    @JsonProperty(index = 1)
    private Boolean isClimateOn;

    @Schema(description = "Indicates if the battery heater is on.", example = "true")
    @JsonProperty(index = 2)
    private Boolean isBatteryHeaterOn;

    @Schema(description = "The target temperature set by the user in °C.", example = "20.1")
    @JsonProperty(index = 4)
    private Double temperatureTarget;

    @Schema(description = "The current temperature inside the vehicle in °C.", example = "18.1")
    @JsonProperty(index = 3)
    private Double temperatureCurrent;
}
