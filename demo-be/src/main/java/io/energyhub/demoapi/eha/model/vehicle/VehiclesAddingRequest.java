package io.energyhub.demoapi.eha.model.vehicle;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object for vehicle IDs request that should be added to the Energy Hub.")
public class VehiclesAddingRequest {

    @NotEmpty
    @Schema(description = "List of external IDs of vehicles to be linked to the Energy Hub.", example = "[\"8413731391660801\"]")
    private Set<String> externalVehicles;
}

