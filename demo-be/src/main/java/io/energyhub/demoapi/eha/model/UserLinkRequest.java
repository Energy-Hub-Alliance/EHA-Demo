package io.energyhub.demoapi.eha.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLinkRequest {

    @NotBlank
    @Size(max = 50)
    @Schema(description = "The ID of the user for which to create the connect session.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    private String userId;

    @NotBlank
    @Size(max = 2048)
    @Schema(description = "The URL to which the user will be redirected.",
            example = "https://www.redirectable-website.com/v1/endpoint/bea09c5f-9d37-4562-b54a-dedb48d7aaf4")
    private String redirectUrl;
}
