package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class TariffResponse {

    @NotNull
    @JsonProperty(value = "id", index = 1)
    @Schema(description = "The ID of the tariff")
    private UUID uuid;

    @NotNull
    @Schema(description = "The ID of the user.", example = "12345")
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The location ID.", example = "7364fc92-20e1-4033-ac18-cb19c35e97e0")
    @JsonProperty(index = 3)
    private UUID locationId;

    @NotNull
    @Schema(description = "Indicates if the tariff is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 4)
    private Boolean isOnline;

    @Schema(description = "Object of static data of a tariff.")
    @Valid
    @NotNull
    @JsonProperty(index = 5)
    private TariffStaticData staticData;
}
