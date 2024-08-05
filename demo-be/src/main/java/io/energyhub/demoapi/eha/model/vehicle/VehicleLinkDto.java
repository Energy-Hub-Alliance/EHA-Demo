package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.constant.Vendor;
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
    private UUID id;

    @NotNull
    @Schema(description = "ID of the vehicle in external vendor system.", example = "8413731391660801")
    private String externalId;

    @NotNull
    @Schema(description = "The vehicle identification number (VIN).", example = "1XKAD29X0KS502460")
    private String vin;

    @NotNull
    @Schema(description = "The display name of the vehicle.", example = "My Tesla")
    private String vehicleName;

    @NotNull
    @Schema(description = "The vendor of the vehicle.", example = "TESLA")
    private Vendor vendor;

    @NotNull
    @Schema(description = "Indicates if the vehicle is linked with the Energy Hub Alliance.", example = "true")
    private Boolean isLinked;
}
