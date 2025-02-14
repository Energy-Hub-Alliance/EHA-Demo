package io.energyhub.demoapi.eha.model;

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
public class ScheduleByWeekday {

    @Schema(description = "The time of the start schedule.", example = "00:00")
    @NotNull
    private String start;

    @Schema(description = "The time of the end schedule.", example = "08:00")
    @NotNull
    private String end;

    @Schema(description = "Indicates which mode is currently active.", example = "HEAT")
    @NotNull
    private HvacMode mode;

    @NotNull
    @Schema(description = "The current temperature measured outside in °C.", example = "21")
    private Float temperature;
}
