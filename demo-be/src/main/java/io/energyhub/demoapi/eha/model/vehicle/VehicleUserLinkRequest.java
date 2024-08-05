package io.energyhub.demoapi.eha.model.vehicle;

import io.energyhub.demoapi.eha.model.UserLinkRequest;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class VehicleUserLinkRequest extends UserLinkRequest {

    @NotNull
    @Schema(description = "An API which we are connecting the user to", type = "string", allowableValues = "TESLA")
    private Vendor vendor;

    @Schema(description = "Vehicle identification number", pattern = "^[A-Z0-9]{17}$", example = "1XKAD29X0KS502460")
    private String vin;

}
