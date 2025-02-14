package io.energyhub.demoapi.eha.model.inverter;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.meter.MeterInverterStaticData;
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
@Schema(description = "Object of PV inverter response.")
public class PvInverterResponse {

    @NotNull
    @Schema(description = "The ID of the PV inverter device.", example = "6eb5497d-c6bb-4290-84ef-4409fe9501f1")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The timestamp of the last update of any field in the PV inverter.")
    @JsonProperty(index = 7)
    private LocalDateTime lastUpdated;

    @Schema(description = "The location ID of the battery.")
    @JsonProperty(index = 3)
    private UUID locationId;

    @NotNull
    @Schema(description = "Indicates if the PV inverter is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 4)
    private Boolean isOnline;

    @Valid
    @NotNull
    @Schema(description = "Object of static data of a PV inverter.")
    @JsonProperty(index = 5)
    private MeterInverterStaticData staticData;

    @Valid
    @Schema(description = "Object of power state of a PV inverter.")
    @JsonProperty(index = 6)
    private PvInverterPowerState powerState;

}
