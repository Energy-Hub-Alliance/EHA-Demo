package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of vehicle for linking process.")
public class VehicleLinkDto {

    @NotNull
    @Schema(description = "The ID of the vehicle.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotNull
    @Schema(description = "ID of the vehicle in external vendor system.", example = "8413731391660801")
    @JsonProperty(index = 2)
    private String externalId;

    @NotNull
    @Schema(description = "The vehicle identification number (VIN).", example = "1XKAD29X0KS502460")
    @JsonProperty(index = 3)
    private String vin;

    @NotNull
    @Schema(description = "The display name of the vehicle.", example = "My Tesla")
    @JsonProperty(index = 6)
    private String name;

    @NotNull
    @Schema(description = "The vendor of the vehicle.", example = "TESLA")
    @JsonProperty(index = 5)
    private String vendor;

    @NotNull
    @Schema(description = "Indicates if the vehicle is linked to the Energy Hub.")
    @JsonProperty(index = 4)
    private Boolean isLinked = false;

    @JsonIgnore
    @Schema(description = "The capacity of battery in kWh", example = "32.12")
    private Double batteryCapacity;

    @JsonIgnore
    @Schema(description = "The model of the vehicle.", example = "Model Y")
    private String model;

    @JsonIgnore
    @Schema(description = "The vehicle variant of the vehicle.", example = "Model Y")
    private String vehicleVariant;
}
