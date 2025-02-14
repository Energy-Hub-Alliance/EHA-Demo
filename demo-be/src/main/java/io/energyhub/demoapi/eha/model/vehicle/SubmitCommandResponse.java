package io.energyhub.demoapi.eha.model.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.enums.CommandState;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class SubmitCommandResponse {

    @NotNull
    @Schema(description = "The ID of the command.")
    @JsonProperty(index = 1)
    private UUID id;

    @NotNull
    @Schema(description = "The ID of the vehicle.")
    @JsonProperty(value = "deviceId", index = 3)
    private UUID deviceUuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = "896f9d5a-b618-48a2-98ae-957059bf1bc9")
    @JsonProperty(index = 2)
    private String userId;

    @NotNull
    @Schema(description = "The name of the command type to execute.")
    @JsonProperty(index = 4)
    private CommandType type;

    @NotNull
    @Schema(description = "The state of the command.")
    @JsonProperty(index = 5)
    private CommandState state;

    @NotNull
    @Schema(description = "The timestamp when command is created.")
    @JsonProperty(index = 6)
    private LocalDateTime createdAt;

}
