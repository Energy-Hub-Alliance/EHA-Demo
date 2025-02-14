package io.energyhub.demoapi.eha.model.meter;

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
@Schema(description = "Object of meter response.")
public class MeterResponse {

    @NotNull
    @Schema(description = "The ID of the meter.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The timestamp of the last update of any variable of the meter.")
    @JsonProperty(index = 7)
    private LocalDateTime lastUpdated;

    @Schema(description = "The location ID of the meter.")
    @JsonProperty(index = 3)
    private UUID locationId;

    @NotNull
    @Schema(description = "Indicates if the meter is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 4)
    private Boolean isOnline;

    @Schema(description = "Object of static data of a meter.")
    @Valid
    @NotNull
    @JsonProperty(index = 5)
    private MeterInverterStaticData staticData;

    @Schema(description = "Object of the power state of the meter.")
    @Valid
    @JsonProperty(index = 6)
    private MeterPowerState powerState;
}
