package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.HvacType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of HVAC for linking process.")
public class HvacLinkDto {

    @NotNull
    @Schema(description = "The ID of the HVAC.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotNull
    @Schema(description = "ID of the device in external vendor system.", example = "8413731391660801")
    @JsonProperty(index = 2)
    private String externalId;

    @NotNull
    @Schema(description = "The vendor of the HVAC.", example = "VIESSMANN")
    @JsonProperty(index = 4)
    private String vendor;

    @NotNull
    @Schema(description = "Indicates if the HVAC is linked to the Energy Hub.")
    @JsonProperty(index = 3)
    private Boolean isLinked;

    @NotNull
    @Schema(description = "The name of the HVAC in human-readable format.", example = "Viessmann Vitotronic 200")
    @JsonProperty(index = 6)
    private String name;

    @Schema(description = "The model of the HVAC.", example = "Vitotronic 200")
    @NotNull
    @JsonProperty(index = 5)
    private String model;

    @NotNull
    @Schema(description = "The type of the HVAC.")
    @JsonProperty(index = 7)
    private HvacType type;

}
