package io.energyhub.demoapi.eha.model.meter;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Schema(description = "Object of power state of a meter.")
public class MeterPowerState {

    @Schema(description = "The timestamp of the last update of the power state data.")
    @JsonProperty(index = 3)
    private LocalDateTime lastUpdated;

    @Schema(description = "The current power of the meter in kW.", example = "12")
    @JsonProperty(index = 1)
    private Double power;

    @Schema(description = "The current meter value of the system in kWh.", example = "289.99")
    @JsonProperty(index = 2)
    private Double meterValue;
}