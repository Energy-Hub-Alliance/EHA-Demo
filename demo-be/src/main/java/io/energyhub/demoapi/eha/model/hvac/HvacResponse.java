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
    @Schema(description = "The ID of the hvac.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    private String userId;

    @Schema(description = "The name of the HVAC in human-readable format.", example = "Viessmann Vitotronic 200")
    private String hvacName;

    @Schema(description = "The timestamp of the last update of any variable of the hvac.")
    private LocalDateTime lastUpdated;

    @Schema(description = "The location ID of the hvac.")
    @Valid
    private UUID locationId;

    @NotNull
    @Schema(description = "Indicates if the vehicle is reachable trough the vendor system.", example = "true")
    private Boolean isOnline;

    @Schema(description = "Object of static data of a hvac.")
    @Valid
    @NotNull
    private HvacStaticData staticData;

    @Schema(description = "Object of the climate state of the hvac.")
    @Valid
    private HvacClimateState climateState;

    @Schema(description = "Object of the power state of the hvac.")
    @Valid
    private HvacPowerState powerState;
}
