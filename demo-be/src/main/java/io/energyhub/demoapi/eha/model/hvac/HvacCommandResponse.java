package io.energyhub.demoapi.eha.model.hvac;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.constant.DocumentationExample;
import io.energyhub.demoapi.eha.model.enums.CommandState;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class HvacCommandResponse {

    @NotNull
    @Schema(description = "The ID of the command.")
    @JsonProperty(index = 1)
    private UUID id;

    @NotNull
    @Schema(description = "The ID of the device.")
    @JsonProperty(value = "deviceId", index = 3)
    private UUID deviceUuid;

    @NotBlank
    @Schema(description = "The ID of the user.", example = DocumentationExample.USER_ID)
    @JsonProperty(index = 2)
    private String userId;

    @NotNull
    @Schema(description = "The name of the command type to execute.", example = "SET_TEMPERATURE")
    @JsonProperty(index = 4)
    private HvacCommand type;

    @NotNull
    @Schema(description = "The state of the command.", example = "PENDING")
    @JsonProperty(index = 5)
    private CommandState state;

    @Schema(description = "Detailed info why was this command has not executed successfully.")
    @JsonProperty(index = 6)
    private String failedReason;

    @NotNull
    @Schema(description = "The timestamp when command is created.")
    @JsonProperty(index = 7)
    private LocalDateTime createdAt;

    @Schema(description = "The timestamp of the last update of any field of the command data.")
    @JsonProperty(index = 8)
    private LocalDateTime lastUpdated;

}
