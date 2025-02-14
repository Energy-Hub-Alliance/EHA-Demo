package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.HvacType;
import io.swagger.v3.oas.annotations.media.Schema;
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
public class HvacShortResponse {

    @NotNull
    @Schema(description = "The ID of the HVAC.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The name of the HVAC in human-readable format.", example = "Viessmann Vitotronic 200")
    @JsonProperty(index = 6)
    private String name;

    @Schema(description = "The model of the HVAC.", example = "Vitotronic 200")
    @NotNull
    @JsonProperty(index = 5)
    private String model;

    @NotNull
    @Schema(description = "The vendor of the HVAC.", example = "VIESSMANN")
    @JsonProperty(index = 4)
    private String vendor;

    @Schema(description = "The timestamp of the last update of any variable of the HVAC.")
    @JsonProperty(index = 8)
    private LocalDateTime lastUpdated;

    @NotNull
    @Schema(description = "Indicates if the HVAC is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 3)
    private Boolean isOnline;

    @Schema(description = "The type of the HVAC.")
    @JsonProperty(index = 7)
    private HvacType type;
}
