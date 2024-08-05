package io.energyhub.demoapi.eha.model.hvac;

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
@Schema(description = "Object for hvac IDs request that should be added to the Energy Hub Alliance.")
public class HvacsAddingRequest {

    @NotEmpty
    @Schema(description = "List of external IDs of hvacs to be linked to the Energy Hub Alliance.", example = "[\"8413731391660801\"]")
    private Set<String> externalHvacs;

}
