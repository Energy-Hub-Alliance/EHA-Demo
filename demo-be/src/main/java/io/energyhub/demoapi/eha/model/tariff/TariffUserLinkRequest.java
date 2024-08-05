package io.energyhub.demoapi.eha.model.tariff;

import io.energyhub.demoapi.eha.model.UserLinkRequest;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Schema(description = "An object containing relevant information for linking to vendor account for tariff vendor")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class TariffUserLinkRequest extends UserLinkRequest {

    @NotNull
    @Schema(description = "The tariff vendor enum to start the connect session.", type = "string", allowableValues = "TIBBER")
    private Vendor vendor;
}
