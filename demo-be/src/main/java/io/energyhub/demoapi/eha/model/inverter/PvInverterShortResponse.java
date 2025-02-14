package io.energyhub.demoapi.eha.model.inverter;

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

@Schema(description = "Object of PV inverter response data with reduced data keys.")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PvInverterShortResponse {

    @NotNull
    @Schema(description = "The ID of the PV Inverter.", example = "6eb5497d-c6bb-4290-84ef-4409fe9501f1")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @NotNull
    @Schema(description = "Indicates if the PV inverter is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 3)
    private Boolean isOnline;

    @NotNull
    @Schema(description = "The display name of the PV inverter.", example = "My device")
    @JsonProperty(index = 6)
    private String name;

    @Schema(description = "The vendor of the PV inverter.", example = "FRONIUS")
    @NotNull
    @JsonProperty(index = 4)
    private String vendor;

    @Schema(description = "The model of the PV Inverter.", example = "Sunny Inverter")
    @JsonProperty(index = 5)
    private String model;

    @Schema(description = "The timestamp of the last update of any variable of the PV inverter.")
    @JsonProperty(index = 7)
    private LocalDateTime lastUpdated;

}
