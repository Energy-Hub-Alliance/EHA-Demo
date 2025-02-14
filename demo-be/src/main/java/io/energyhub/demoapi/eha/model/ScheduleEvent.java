package io.energyhub.demoapi.eha.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.HvacMode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Event object of the schedules.")
public class ScheduleEvent {

    @NotNull
    @Schema(description = "Weekday and time of the start of the schedule.")
    @JsonProperty(index = 1)
    private ScheduleDayTime start;

    @Schema(description = "Weekday and time of the end of the schedule.")
    @JsonProperty(index = 2)
    private ScheduleDayTime end;

    @Schema(description = "The scheduled mode.", example = "HEAT")
    @NotNull
    @JsonProperty(index = 3)
    private HvacMode mode;

    @Schema(description = "The scheduled temperature measured in °C.", example = "21.1")
    @JsonProperty(index = 4)
    private Double temperature;
}
