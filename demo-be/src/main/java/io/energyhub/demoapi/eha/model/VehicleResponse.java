package io.energyhub.demoapi.eha.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.vehicle.ChargeState;
import io.energyhub.demoapi.eha.model.vehicle.ClimateState;
import io.energyhub.demoapi.eha.model.vehicle.Odometer;
import io.energyhub.demoapi.eha.model.vehicle.StaticData;
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
    private String userId;

    @Schema(description = "Object of static data of a vehicle.")
    @Valid
    @NotNull
    private StaticData staticData;

    @Schema(description = "Object of the odometer of the vehicle.")
    private Odometer odometer;

    @NotNull
    @Schema(description = "Indicates if the vehicle is reachable trough the vendor system.", example = "true")
    private Boolean isOnline;

    @Schema(description = "The timestamp of the last update of any field in the vehicle data.")
    private LocalDateTime lastUpdated;

    @Schema(description = "Object of the location of the vehicle.")
    @Valid
    private Location location;

    @Schema(description = "Object of the state of charge of the vehicle.")
    @Valid
    private ChargeState chargeState;

    @Schema(description = "Object of the climate state of the vehicle.")
    @Valid
    private ClimateState climateState;
}
