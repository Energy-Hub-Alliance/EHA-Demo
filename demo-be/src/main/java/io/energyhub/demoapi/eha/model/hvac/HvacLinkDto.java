package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.energyhub.demoapi.eha.model.enums.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of hvac for linking process.")
public class HvacLinkDto {

    @NotNull
    @Schema(description = "The ID of the hvac.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotNull
    @Schema(description = "ID of the device in external vendor system.", example = "8413731391660801")
    private String externalId;

    @NotNull
    @Schema(description = "The vendor of the hvac.")
    private Vendor vendor;

    @NotNull
    @Schema(description = "Indicates if the hvac is linked with the Energy Hub Alliance.")
    private Boolean isLinked;

    @NotNull
    @Schema(description = "The name of the HVAC in human-readable format.", example = "Viessmann Vitotronic 200")
    private String hvacName;

    @Schema(description = "The model of the hvac.", example = "Vitotronic 200")
    @NotNull
    private String model;

    @NotNull
    @Schema(description = "The type of the hvac.")
    private Type type;

    // ignored as it is only used for mapping to entity
    @JsonIgnore
    private String timeZone;
}
