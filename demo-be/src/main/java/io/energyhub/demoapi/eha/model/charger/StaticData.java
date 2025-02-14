package io.energyhub.demoapi.eha.model.charger;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Schema(description = "Object of static data of a charger.")
public class StaticData {

    @Schema(description = "The timestamp of the last update of the static data.")
    @NotNull
    @JsonProperty(index = 4)
    private LocalDateTime lastUpdated;

    @Schema(description = "The name of the charger.", example = "My charger")
    @JsonProperty(index = 3)
    private String name;

    @Schema(description = "The model of the charger.", example = "Wallbox")
    @NotNull
    @JsonProperty(index = 2)
    private String model;

    @Schema(description = "The vendor of the charger.", example = "EASEE")
    @NotNull
    @JsonProperty(index = 1)
    private String vendor;
}
