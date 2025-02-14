package io.energyhub.demoapi.eha.model.inverter;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.ProductionState;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of power state of a PV inverter.")
public class PvInverterPowerState {

    @Schema(description = "The timestamp of the last update of the power state data.")
    @JsonProperty(index = 3)
    private LocalDateTime lastUpdated;

    @Schema(description = "The current solar power of the system in kW.", example = "12")
    @JsonProperty(index = 1)
    private Double solarPower;

    @Schema(description = "The current production state.")
    @JsonProperty(index = 2)
    private ProductionState state;

}
