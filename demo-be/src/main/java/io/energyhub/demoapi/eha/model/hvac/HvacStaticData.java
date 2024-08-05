package io.energyhub.demoapi.eha.model.hvac;

import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.energyhub.demoapi.eha.model.enums.Mode;
import io.energyhub.demoapi.eha.model.enums.Type;
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
@Schema(description = "Object of static data of a hvac.")
public class HvacStaticData {

    @Schema(description = "The timestamp of the last update of the static data.")
    @NotNull
    private LocalDateTime lastUpdated;

    @Schema(description = "The type of the hvac.", example = "AC")
    private Type type;

    @Schema(description = "The model of the hvac.", example = "Vitotronic 200")
    @NotNull
    private String model;

    @Schema(description = "The vendor of the hvac.", example = "VIESSMANN")
    @NotNull
    private Vendor vendor;

    @Schema(description = "The room of the hvac.", example = "Living room")
    private String room;

    @Schema(description = "The list of capable modes of the HVAC device.")
    @NotNull
    private List<Mode> capableModes;
}
