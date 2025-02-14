package io.energyhub.demoapi.eha.model.charger;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "Object of charging phases of charger device.")
public class CommandChargingPhasesRequest {

    @Schema(description = "The number of active phases during charging.", example = "1")
    private int phases;

}
