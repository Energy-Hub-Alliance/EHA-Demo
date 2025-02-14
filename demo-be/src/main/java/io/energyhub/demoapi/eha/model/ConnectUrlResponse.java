package io.energyhub.demoapi.eha.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "An object containing the URL which is used to redirect the user to the connect page or vendor login.")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ConnectUrlResponse {

    @NotBlank
    @Schema(description = "The URL to follow to redirect to connect page or IDP of the vendor.", example = "https://svc-connect.energy-hub.io/bea09c5f-9d37-4562-b54a-dedb48d7aaf4/redirect")
    private String url;
}
