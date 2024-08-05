package io.energyhub.demoapi.eha.model.vehicle;

import io.energyhub.demoapi.eha.model.enums.PowerState;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "This class defines the charge state.")
public class ChargeState implements Serializable {

    @Schema(description = "The datetime of the last updated charge state data.")
    @NotNull
    private LocalDateTime lastUpdated;

    @Schema(description = "The state of the charge of the vehicle battery in percent.", example = "72")
    private Integer stateOfCharge;

    @Schema(description = "The estimated range based on the current battery level in km.", example = "106")
    private Integer estimatedRange;

    @Schema(description = "The rate of the charge while the vehicle is charging in kW.", example = "6.5")
    private Float chargeRate;

    @Schema(description = "The minimum state of charge set by the user for the vehicle in percent.", example = "20")
    private Integer chargeLimitMin;

    @Schema(description = "The maximum state of charge set by the user for the vehicle in percent.", example = "80")
    private Integer chargeLimitMax;

    @Schema(description = "The remaining charging time in minutes.", example = "6")
    private Integer chargingTimeRemaining;

    @Schema(description = "The current charging state.", example = "PLUGGED")
    private PowerState chargingState;

    @Schema(description = "The scheduled charging start time set by the user as timestamp.")
    private LocalDateTime scheduledChargingStartTime;

    @Schema(description = "The scheduled departure time set by the user as timestamp.")
    private LocalDateTime scheduledDepartureTime;
}
