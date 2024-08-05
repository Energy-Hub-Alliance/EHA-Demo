package io.energyhub.demoapi.eha.model.hvac;

import io.energyhub.demoapi.eha.model.UserLinkRequest;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Schema(description = "An object containing relevant information for linking to vendor account for HVAC vendor.")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class HvacUserLinkRequest extends UserLinkRequest {

    @NotNull
    @Schema(description = "An API which we are connecting the user to", type = "string", allowableValues = "VIESSMANN")
    private Vendor vendor;
}