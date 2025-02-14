package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.HvacMode;
import io.energyhub.demoapi.eha.model.enums.HvacType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of static data of a HVAC.")
public class HvacStaticData {

    @Schema(description = "The timestamp of the last update of the static data.")
    @NotNull
    @JsonProperty(index = 7)
    private LocalDateTime lastUpdated;

    @Schema(description = "The type of the hvac.", example = "AC")
    @JsonProperty(index = 1)
    private HvacType type;

    @Schema(description = "The model of the HVAC.", example = "Vitotronic 200")
    @NotNull
    @JsonProperty(index = 4)
    private String model;

    @NotNull
    @Schema(description = "The vendor of the HVAC.", example = "VIESSMANN")
    @JsonProperty(index = 3)
    private String vendor;

    @Schema(description = "The room of the HVAC.", example = "Living room")
    @JsonProperty(index = 2)
    private String room;

    @Schema(description = "The list of capable modes of the HVAC device.")
    @NotNull
    @JsonProperty(index = 6)
    private List<HvacMode> capableModes;

    @Schema(description = "The name of the HVAC in human-readable format.", example = "Viessmann Vitotronic 200")
    @JsonProperty(index = 5)
    private String name;
}
