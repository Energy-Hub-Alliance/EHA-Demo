package io.energyhub.demoapi.eha.model.charger;

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
@Schema(description = "Object of charger for linking process.")
public class ChargerLinkDto {

    @NotNull
    @Schema(description = "The ID of the charger.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotNull
    @Schema(description = "The ID of the charger in external vendor system.", example = "8413731391660801")
    @JsonProperty(index = 2)
    private String externalId;

    @NotNull
    @Schema(description = "The display name of the charger.", example = "My charger")
    @JsonProperty(index = 6)
    private String name;

    @Schema(description = "The model of the charger.", example = "Wallbox")
    @JsonProperty(index = 5)
    private String model;

    @NotNull
    @Schema(description = "The vendor of the charger.", example = "EASEE")
    @JsonProperty(index = 4)
    private String vendor;

    @NotNull
    @Schema(description = "Indicates if the charger is linked to the Energy Hub.")
    @JsonProperty(index = 3)
    private Boolean isLinked = false;

}
