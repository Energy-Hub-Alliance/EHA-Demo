package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Schema(description = "Object of tariff response data with reduced data keys.")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class TariffShortResponse {

    @NotNull
    @Schema(description = "The ID of the tariff.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @NotNull
    @Schema(description = "Indicates if the tariff is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 3)
    private Boolean isOnline;

    @NotNull
    @Schema(description = "The display name of the tariff.", example = "Tibber Bürgerfelder Str.")
    @JsonProperty(index = 5)
    private String name;

    @NotNull
    @Schema(description = "The vendor of the tariff.", example = "OSTROM")
    @JsonProperty(index = 4)
    private String vendor;

    @Schema(description = "The timestamp of the last update of any variable of the tariff.")
    @JsonProperty(index = 6)
    private LocalDateTime lastUpdated;
}
