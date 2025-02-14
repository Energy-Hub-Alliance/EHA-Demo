package io.energyhub.demoapi.eha.model.charger;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.ChargingState;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "Object of charge state data of a charger.")
public class ChargeState {

    @Schema(description = "The timestamp of the last update of the charge state data.")
    @NotNull
    @JsonProperty(index = 6)
    private LocalDateTime lastUpdated;

    @Schema(description = "The rate of the charge while the charger is charging in kW.", example = "6.512")
    @JsonProperty(index = 4)
    private Double chargeRate;

    @Schema(description = "The number of active phases during the charging process.", example = "1")
    @JsonProperty(index = 3)
    private Double activePhases;

    @Schema(description = "The maximum charging current in amperes.", example = "12")
    @JsonProperty(index = 5)
    private Double chargeCurrentMax;

    @Schema(description = "Indicates if the charger is plugged in.", example = "true")
    @JsonProperty(index = 1)
    private Boolean isPlugged;

    @Schema(description = "The current charging state.")
    @JsonProperty(index = 2)
    private ChargingState chargingState;
}
