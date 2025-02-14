package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.EngineType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of static data of a vehicle.")
public class VehicleStaticData {

    @Schema(description = "The timestamp of the last update of the static data.")
    @NotNull
    @JsonProperty(index = 8)
    private LocalDateTime lastUpdated;

    @NotNull
    @Schema(description = "The vendor of the vehicle.", example = "TESLA")
    @JsonProperty(index = 1)
    private String vendor;

    @Schema(description = "The model of the vehicle.", example = "Model 3")
    @NotNull
    @JsonProperty(index = 5)
    private String model;

    @Schema(description = "The variant of the vehicle.", example = "Base")
    @JsonProperty(index = 7)
    private String vehicleVariant;

    @Schema(description = "The vehicle identification number (VIN).", example = "1XKAD29X0KS502460")
    @NotNull
    @JsonProperty(index = 2)
    private String vin;

    @Schema(description = "The display name of the vehicle.", example = "My Tesla")
    @JsonProperty(index = 6)
    private String name;

    @Schema(description = "The engine type of the vehicle.", example = "BEV")
    @JsonProperty(index = 4)
    private EngineType engineType;

    @Schema(description = "The rated battery capacity of the vehicle in kWh.", example = "60.12")
    @JsonProperty(index = 3)
    private Double batteryCapacity;
}
