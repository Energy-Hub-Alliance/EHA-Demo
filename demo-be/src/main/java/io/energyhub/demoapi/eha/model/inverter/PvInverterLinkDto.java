package io.energyhub.demoapi.eha.model.inverter;

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
@Schema(description = "Object of PV inverter for linking process.")
public class PvInverterLinkDto {

    @NotNull
    @Schema(description = "The ID of the PV inverter.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotNull
    @Schema(description = "ID of the PV inverter in external vendor system.", example = "8413731391660801")
    @JsonProperty(index = 2)
    private String externalId;

    @NotNull
    @Schema(description = "The display name of the PV inverter.", example = "My PV inverter")
    @JsonProperty(index = 5)
    private String name;

    @NotNull
    @Schema(description = "The vendor of the PV inverter.", example = "FRONIUS")
    @JsonProperty(index = 4)
    private String vendor;

    @NotNull
    @Schema(description = "Indicates if the PV inverter is linked to the Energy Hub.")
    @JsonProperty(index = 3)
    private Boolean isLinked = false;

    @Schema(description = "The site name of the home energy device.", example = "My Home")
    @JsonProperty(index = 6)
    private String siteName;

}
