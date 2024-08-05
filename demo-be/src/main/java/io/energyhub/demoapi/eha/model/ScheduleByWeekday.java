package io.energyhub.demoapi.eha.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.energyhub.demoapi.eha.model.enums.Mode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleByWeekday {

    @JsonIgnore
    private DayOfWeek weekday;

    @Schema(description = "The time of the start schedule.", example = "00:00")
    @NotNull
    private String start;

    @Schema(description = "The time of the end schedule.", example = "08:00")
    @NotNull
    private String end;

    @Schema(description = "Indicates which mode is currently active.", example = "HEAT")
    @NotNull
    private Mode mode;

    @NotNull
    @Schema(description = "The current temperature measured outside in degrees celsius.", example = "21")
    private Float temperature;
}
