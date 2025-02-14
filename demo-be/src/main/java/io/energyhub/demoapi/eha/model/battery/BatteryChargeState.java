package io.energyhub.demoapi.eha.model.battery;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.Mode;
import io.energyhub.demoapi.eha.model.enums.battery.ChargingState;
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
@Schema(description = "Object of charge state data of a battery.")
public class BatteryChargeState {

    @Schema(description = "The timestamp of the last update of the battery state data.")
    @NotNull
    @JsonProperty(index = 9)
    private LocalDateTime lastUpdated;

    @Schema(description = "The state of the charge of the battery in percent.", example = "72.25")
    @JsonProperty(index = 2)
    private Double stateOfCharge;

    @Schema(description = "The mode  of the battery.")
    @JsonProperty(index = 1)
    private Mode mode;

    @Schema(description = "The minimum state of charge set by the user for the battery in percent.", example = "20.25")
    @JsonProperty(index = 5)
    private Double chargeLimitMin;

    @Schema(description = "The maximum state of charge set by the user for the battery in percent.", example = "80.25")
    @JsonProperty(index = 6)
    private Double chargeLimitMax;

    @Schema(description = "The maximum charge rate of the battery in kW", example = "6")
    @JsonProperty(index = 3)
    private Double maxChargeRate;

    @Schema(description = "The maximum discharge rate of the battery in kW", example = "6")
    @JsonProperty(index = 4)
    private Double maxDischargeRate;

    @Schema(description = "The charge rate of the battery in kW. Values are negative during discharging and positive during charging of the battery.", example = "6.512")
    @JsonProperty(index = 7)
    private Double chargeRate;

    @Schema(description = "The current charging state.", example = "CHARGING")
    @JsonProperty(index = 8)
    private ChargingState chargingState;

}
