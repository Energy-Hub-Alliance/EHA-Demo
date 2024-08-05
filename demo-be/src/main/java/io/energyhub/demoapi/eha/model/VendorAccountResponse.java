package io.energyhub.demoapi.eha.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class VendorAccountResponse {

    @NotNull
    @Schema(description = "The ID of the vendor account.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    private String userId;

    @NotNull
    @Schema(description = "ID of the subscription.")
    private UUID subscriptionId;

    @NotNull
    @Schema(description = "Vendor name.")
    private Vendor vendor;

    @NotNull
    @Schema(description = "Date od vendor account creation.")
    private LocalDateTime createdAt;

}
