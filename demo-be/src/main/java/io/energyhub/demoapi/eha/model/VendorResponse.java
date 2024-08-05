package io.energyhub.demoapi.eha.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class VendorResponse {

    @NotNull
    @Schema(description = "The enum of the vendor.")
    private String id;

    @NotNull
    @Schema(description = "The vendor name in human readable format.")
    private String name;

    @NotNull
    @Schema(description = "The required information to ask the user for before creating a connect session.")
    private List<String> required;

    @NotNull
    @Schema(description = "The URL to the vendor logo.", example = "https://energy-hub.io/api/vendors/v1/tesla/logo")
    private String logoUrl;
}
