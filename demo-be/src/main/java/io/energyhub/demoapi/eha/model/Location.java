package io.energyhub.demoapi.eha.model;

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
@Schema(description = "Object of location data of a vehicle.")
public class Location implements Serializable {

    @Schema(description = "The timestamp of the last update of the location data.")
    @NotNull
    private LocalDateTime lastUpdated;

    @Schema(description = "The latitude of the location in degrees.", pattern = "-?[0-9]{1,2}\\.[0-9]{5,7}", example = "50.770774")
    @NotNull
    private Double latitude;

    @Schema(description = "The longitude of the location in degrees.", pattern = "-?[0-9]{1,3}\\.[0-9]{5,7}", example = "-126.104965")
    @NotNull
    private Double longitude;
}
