package io.energyhub.demoapi.eha.model.battery;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.battery.ChargingState;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Elements in the page. If there is no elements the list will be empty.")
public class BatteryShortResponse {

    @NotNull
    @Schema(description = "The ID of the battery.")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the battery.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The name of the battery.", example = "My device")
    @JsonProperty(index = 6)
    private String name;

    @Schema(description = "The model of the battery.", example = "Charge")
    @NotNull
    @JsonProperty(index = 5)
    private String model;

    @Schema(description = "The vendor of the battery.", example = "TESLA")
    @NotNull
    @JsonProperty(index = 4)
    private String vendor;

    @Schema(description = "The timestamp of the last update of any variable of the battery.")
    @JsonProperty(index = 8)
    private LocalDateTime lastUpdated;

    @NotNull
    @Schema(description = "Indicates if the battery is reachable trough the vendor system.", example = "true")
    @JsonProperty(index = 3)
    private Boolean isOnline;

    @Schema(description = "The state of the battery.")
    @JsonProperty(index = 7)
    private ChargingState chargingState;
}
