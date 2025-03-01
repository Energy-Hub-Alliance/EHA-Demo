package io.energyhub.demoapi.eha.model.battery;

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
@Schema(description = "Object of battery response.")
public class BatteryResponse {

    @NotNull
    @Schema(description = "The ID of the battery.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The timestamp of the last update of any variable of the battery.")
    @JsonProperty(index = 7)
    private LocalDateTime lastUpdated;

    @Schema(description = "The location ID of the battery.")
    @JsonProperty(index = 3)
    private UUID locationId;

    @NotNull
    @Schema(description = "Indicates if the battery is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 4)
    private Boolean isOnline;

    @Schema(description = "Object of static data of a battery.")
    @Valid
    @NotNull
    @JsonProperty(index = 5)
    private BatteryStaticData staticData;

    @Schema(description = "Object of the battery state of the battery.")
    @Valid
    @JsonProperty(index = 6)
    private BatteryChargeState chargeState;
}
