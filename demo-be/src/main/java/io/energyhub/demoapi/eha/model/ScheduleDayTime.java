package io.energyhub.demoapi.eha.model;

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
@Schema(description = "Object containing weekday and time of day.", name = "ScheduleDayTime")
public class ScheduleDayTime {

    @Schema(description = "The day of the week", example = "MON")
    @NotNull
    private DayOfWeek day;

    @Schema(description = "The time of day.", example = "00:00")
    @NotNull
    private String time;
}
