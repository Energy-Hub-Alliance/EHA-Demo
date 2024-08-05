package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Schema(description = "Object of vehicle response data with reduced data keys.")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class VehicleShortResponse {

    @NotNull
    @Schema(description = "The ID of the vehicle.", example = "6eb5497d-c6bb-4290-84ef-4409fe9501f1")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    private String userId;

    @NotNull
    @Schema(description = "The vehicle identification number (VIN).", example = "1XKAD29X0KS502460")
    private String vin;

    @NotNull
    @Schema(description = "The display name of the vehicle.", example = "My Tesla")
    private String vehicleName;

    @Schema(description = "The manufacturer of the vehicle.", example = "TESLA")
    @NotNull
    private Vendor vendor;

    @NotNull
    @Schema(description = "Indicates if the vehicle is reachable trough the vendor system.", example = "true")
    private Boolean isOnline;

    @Schema(description = "The model of the vehicle.", example = "Model 3")
    private String model;

    @Schema(description = "The timestamp of the last update of any variable of the vehicle.")
    private LocalDateTime lastUpdated;
}
