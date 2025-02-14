package io.energyhub.demoapi.eha.model.charger;

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


@Schema(description = "Object of charger response data with reduced data keys.")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ChargerShortResponse {

    @NotNull
    @Schema(description = "The ID of the charger.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @NotNull
    @Schema(description = "Indicates if the charger is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 3)
    private Boolean isOnline;

    @NotNull
    @Schema(description = "The name of the charger.", example = "My charger")
    @JsonProperty(index = 6)
    private String name;

    @Schema(description = "The vendor of the charger.", example = "EASEE")
    @NotNull
    @JsonProperty(index = 4)
    private String vendor;

    @Schema(description = "The model of the charger.", example = "Wallbox")
    @JsonProperty(index = 5)
    private String model;

    @Schema(description = "The timestamp of the last update of any variable of the charger.")
    @JsonProperty(index = 7)
    private LocalDateTime lastUpdated;
}
