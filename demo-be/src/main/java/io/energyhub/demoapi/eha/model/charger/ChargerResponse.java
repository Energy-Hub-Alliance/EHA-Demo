package io.energyhub.demoapi.eha.model.charger;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of charger response.")
public class ChargerResponse {

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
    @JsonProperty(index = 4)
    private Boolean isOnline;

    @Schema(description = "The timestamp of the last update of any field in the charger data.")
    @JsonProperty(index = 7)
    private LocalDateTime lastUpdated;

    @Schema(description = "Object of the location of the charger.")
    @Valid
    @JsonProperty(index = 3)
    private UUID location;

    @Schema(description = "Object of static data of a charger.")
    @Valid
    @JsonProperty(index = 5)
    private StaticData staticData;

    @Schema(description = "Object of the charge state of the charger.")
    @Valid
    @JsonProperty(index = 6)
    private ChargeState chargeState;
}
