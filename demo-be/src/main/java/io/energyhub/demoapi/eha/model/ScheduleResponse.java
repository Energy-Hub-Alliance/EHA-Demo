package io.energyhub.demoapi.eha.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponse {

    @NotBlank
    @Schema(description = "The timezone of the schedule.", example = "Europe/Berlin")
    private String timeZone;

    @NotNull
    @Schema(description = "The schedule of monday.")
    private List<ScheduleByWeekday> monday = new ArrayList<>();

    @NotNull
    @Schema(description = "The schedule of tuesday.")
    private List<ScheduleByWeekday> tuesday = new LinkedList<>();

    @NotNull
    @Schema(description = "The schedule of wednesday.")
    private List<ScheduleByWeekday> wednesday = new ArrayList<>();

    @NotNull
    @Schema(description = "The schedule of thursday.")
    private List<ScheduleByWeekday> thursday = new ArrayList<>();

    @NotNull
    @Schema(description = "The schedule of friday.")
    private List<ScheduleByWeekday> friday = new ArrayList<>();

    @NotNull
    @Schema(description = "The schedule of saturday.")
    private List<ScheduleByWeekday> saturday = new ArrayList<>();

    @NotNull
    @Schema(description = "The schedule of sunday.")
    private List<ScheduleByWeekday> sunday = new ArrayList<>();
}
