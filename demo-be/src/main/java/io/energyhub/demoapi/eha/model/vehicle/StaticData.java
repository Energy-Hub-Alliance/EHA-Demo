package io.energyhub.demoapi.eha.model.vehicle;

import io.energyhub.demoapi.eha.model.constant.Vendor;
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
public class StaticData {

    @Schema(description = "The timestamp of the last update of the static data.")
    @NotNull
    private LocalDateTime lastUpdated;

    @Schema(description = "The vendor of the vehicle.", example = "TESLA")
    @NotNull
    private Vendor vendor;

    @Schema(description = "The model of the vehicle.", example = "Model 3")
    @NotNull
    private String model;

    @Schema(description = "The variant of the vehicle.", example = "Base")
    private String vehicleVariant;

    @Schema(description = "The vehicle identification number (VIN).", example = "1XKAD29X0KS502460")
    @NotNull
    private String vin;

    @Schema(description = "The display name of the vehicle.", example = "My Tesla")
    private String vehicleName;

    @Schema(description = "The engine type of the vehicle.", example = "BEV")
    private EngineType engineType;

    @Schema(description = "The rated battery capacity of the vehicle in kWh.", example = "60")
    private Float batteryCapacity;
}
