package io.energyhub.demoapi.eha.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.vehicle.VehicleChargeState;
import io.energyhub.demoapi.eha.model.vehicle.VehicleClimateState;
import io.energyhub.demoapi.eha.model.vehicle.Odometer;
import io.energyhub.demoapi.eha.model.vehicle.VehicleStaticData;
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
@Schema(description = "Object of vehicle response.")
public class VehicleResponse {

    @NotNull
    @Schema(description = "The ID of the vehicle.", example = "6eb5497d-c6bb-4290-84ef-4409fe9501f1")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(value = "userId", index = 2)
    private String userId;

    @Schema(description = "Object of static data of a vehicle.")
    @Valid
    @NotNull
    @JsonProperty(value = "staticData", index = 5)
    private VehicleStaticData staticData;

    @Schema(description = "Object of the odometer of the vehicle.")
    @JsonProperty(value = "odometer", index = 6)
    private Odometer odometer;

    @NotNull
    @Schema(description = "Indicates if the vehicle is reachable trough the vendor system.", example = "true")
    @JsonProperty(value = "isOnline", index = 3)
    private Boolean isOnline;

    @Schema(description = "The timestamp of the last update of any field in the vehicle data.")
    @JsonProperty(value = "lastUpdated", index = 9)
    private LocalDateTime lastUpdated;

    @Schema(description = "Object of the location of the vehicle.")
    @Valid
    @JsonProperty(value = "location", index = 4)
    private Location location;

    @Schema(description = "Object of the state of charge of the vehicle.")
    @Valid
    @JsonProperty(value = "chargeState", index = 7)
    private VehicleChargeState chargeState;

    @Schema(description = "Object of the climate state of the vehicle.")
    @Valid
    @JsonProperty(value = "climateState", index = 8)
    private VehicleClimateState climateState;
}
