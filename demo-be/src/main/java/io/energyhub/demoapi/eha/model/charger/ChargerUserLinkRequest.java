package io.energyhub.demoapi.eha.model.charger;

import io.energyhub.demoapi.eha.model.UserLinkRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Schema(description = "An object containing relevant information to link charger vendor accounts.")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class ChargerUserLinkRequest extends UserLinkRequest {

    @NotNull
    @Schema(description = "The vendor of the account to be added to the Energy Hub.", example = "EASEE")
    private String vendor;

}
