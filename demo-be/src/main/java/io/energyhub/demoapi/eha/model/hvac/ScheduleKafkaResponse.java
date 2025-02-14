package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.constant.DocumentationExample;
import io.energyhub.demoapi.eha.model.ScheduleEvent;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response object of the schedules for each day of the week.")
public class ScheduleKafkaResponse {

    @NotNull
    @Schema(description = "The ID of the HVAC.", example = "6eb5497d-c6bb-4290-84ef-4409fe9501f1")
    @JsonProperty(value = "id", index = 1)
    private UUID uuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = DocumentationExample.USER_ID)
    @JsonProperty(index = 2)
    private String userId;

    @NotBlank
    @Schema(description = "The timezone of the schedule.", example = "Europe/Berlin")
    @JsonProperty(index = 3)
    private String timeZone;

    @NotNull
    @Schema(description = "The list of schedule events.")
    @JsonProperty(index = 4)
    private List<ScheduleEvent> schedules = new ArrayList<>();

}
