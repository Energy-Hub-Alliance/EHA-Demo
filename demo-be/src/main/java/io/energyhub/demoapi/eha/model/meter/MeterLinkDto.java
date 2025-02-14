package io.energyhub.demoapi.eha.model.meter;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of meter for linking process.")
public class MeterLinkDto {

    @NotNull
    @Schema(description = "The ID of the meter.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotNull
    @Schema(description = "The ID of the meter in external vendor system.", example = "8413731391660801")
    @JsonProperty(index = 2)
    private String externalId;

    @NotNull
    @Schema(description = "The display name of the meter.", example = "Fronius Primary Meter")
    @JsonProperty(index = 5)
    private String name;

    @NotNull
    @Schema(description = "The vendor of the meter.", example = "FRONIUS")
    @JsonProperty(index = 4)
    private String vendor;

    @Builder.Default
    @NotNull
    @Schema(description = "Indicates if the meter is linked to the Energy Hub.")
    @JsonProperty(index = 3)
    private Boolean isLinked = false;

    @Schema(description = "The site name of the home energy device.", example = "My Home")
    @JsonProperty(index = 6)
    private String siteName;
}
