package io.energyhub.demoapi.eha.model.hvac;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of power state of HVAC device.")
public class HvacPowerState {

    @Schema(description = "The current power consumption of the HVAC device in watts.", example = "150")
    @NotNull
    private Float powerConsumption;

    @Schema(description = "The timestamp of the last update of the power state.")
    @NotNull
    private LocalDateTime lastUpdated;
}
