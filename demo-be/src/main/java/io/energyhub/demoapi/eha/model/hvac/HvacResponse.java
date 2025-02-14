package io.energyhub.demoapi.eha.model.hvac;

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
@Schema(description = "Object of HVAC response.")
public class HvacResponse {

    @NotNull
    @Schema(description = "The ID of the HVAC.", example = "6eb5497d-c6bb-4290-84ef-4409fe9501f1")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The timestamp of the last update of any variable of the HVAC.")
    @JsonProperty(index = 8)
    private LocalDateTime lastUpdated;

    @Schema(description = "The location ID of the HVAC.")
    @Valid
    @JsonProperty(index = 3)
    private UUID locationId;

    @NotNull
    @Schema(description = "Indicates if the HVAC is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 4)
    private Boolean isOnline;

    @Schema(description = "Object of static data of a HVAC.")
    @Valid
    @NotNull
    @JsonProperty(index = 5)
    private HvacStaticData staticData;

    @Schema(description = "Object of the climate state of the HVAC.")
    @Valid
    @JsonProperty(index = 6)
    private HvacClimateState climateState;

    @Schema(description = "Object of the power state of the HVAC.")
    @Valid
    @JsonProperty(index = 7)
    private HvacPowerState powerState;
}
