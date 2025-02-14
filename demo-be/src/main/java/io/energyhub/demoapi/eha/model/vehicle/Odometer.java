package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Schema(description = "Object of odometer data of a vehicle.")
public class Odometer {

    @Schema(description = "The current odometer of the vehicle in km.", example = "12228")
    @NotNull
    @JsonProperty(index = 1)
    private Integer odometer;

    @Schema(description = "The timestamp of the last update of the odometer data.")
    @NotNull
    @JsonProperty(index = 2)
    private LocalDateTime lastUpdated;

}
