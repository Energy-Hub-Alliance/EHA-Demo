package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.VehiclePowerState;
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
@Schema(description = "This class defines the charge state.")
public class VehicleChargeState {

    @Schema(description = "The datetime of the last updated charge state data.")
    @NotNull
    @JsonProperty(index = 10)
    private LocalDateTime lastUpdated;

    @Schema(description = "The state of the charge of the vehicle battery in percent.", example = "72.25")
    @JsonProperty(index = 1)
    private Double stateOfCharge;

    @Schema(description = "The estimated range based on the current battery level in km.", example = "106")
    @JsonProperty(index = 7)
    private Integer estimatedRange;

    @Schema(description = "The rate of the charge while the vehicle is charging in kW.", example = "6.512")
    @JsonProperty(index = 3)
    private Double chargeRate;

    @Schema(description = "The minimum state of charge set by the user for the vehicle in percent.", example = "20.25")
    @JsonProperty(index = 5)
    private Double chargeLimitMin;

    @Schema(description = "The maximum state of charge set by the user for the vehicle in percent.", example = "80.25")
    @JsonProperty(index = 6)
    private Double chargeLimitMax;

    @Schema(description = "The remaining charging time in minutes.", example = "6")
    @JsonProperty(index = 4)
    private Integer chargingTimeRemaining;

    @Schema(description = "The current charging state.", example = "PLUGGED")
    @JsonProperty(index = 2)
    private VehiclePowerState chargingState;

    @Schema(description = "The scheduled charging start time set by the user as timestamp.")
    @JsonProperty(index = 8)
    private LocalDateTime scheduledChargingStartTime;

    @Schema(description = "The scheduled departure time set by the user as timestamp.")
    @JsonProperty(index = 9)
    private LocalDateTime scheduledDepartureTime;
}
