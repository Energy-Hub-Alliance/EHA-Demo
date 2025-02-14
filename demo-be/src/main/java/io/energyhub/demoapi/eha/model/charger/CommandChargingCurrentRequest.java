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
@Schema(description = "Object of charging current target of charger device.")
public class CommandChargingCurrentRequest {

    @Schema(description = "The charging current during an active charging process.", example = "12")
    private int amps;
}
