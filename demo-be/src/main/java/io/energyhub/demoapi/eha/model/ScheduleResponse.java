package io.energyhub.demoapi.eha.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Schema(description = "Response object of the schedules for each day of the week.")
public class ScheduleResponse {

    @NotBlank
    @Schema(description = "The timezone of the schedule.", example = "Europe/Berlin")
    @JsonProperty(index = 1)
    private String timeZone;

    @NotNull
    @Schema(description = "The list of schedule events.")
    @JsonProperty(index = 2)
    private List<ScheduleEvent> schedules = new ArrayList<>();
}
