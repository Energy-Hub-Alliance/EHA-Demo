package io.energyhub.demoapi.eha.model.battery;

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
@Schema(description = "Object of static data of a home energy device.")
public class BatteryStaticData {

    @Schema(description = "The display name of the home energy device.", example = "My device")
    @NotNull
    @JsonProperty(index = 3)
    private String name;

    @Schema(description = "The timestamp of the last update of the static data.")
    @NotNull
    @JsonProperty(index = 6)
    private LocalDateTime lastUpdated;

    @Schema(description = "The model of the home energy device.", example = "Charge")
    @NotNull
    @JsonProperty(index = 2)
    private String model;

    @Schema(description = "The vendor of the home energy device.", example = "TESLA")
    @NotNull
    @JsonProperty(index = 1)
    private String vendor;

    @Schema(description = "The capacity of battery in kWh.", example = "12.5")
    @JsonProperty(index = 4)
    private Double batteryCapacity;

    @Schema(description = "The site name of the home energy device.", example = "My Home")
    @JsonProperty(index = 5)
    private String siteName;
}
