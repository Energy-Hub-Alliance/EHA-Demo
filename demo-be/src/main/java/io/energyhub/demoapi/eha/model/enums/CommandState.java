package io.energyhub.demoapi.eha.model.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "CommandState", enumAsRef = true, description = """
        The state of the command.
        * `PENDING` - Command is waiting to be executed.
        * `FAILED` - Execution of command has failed.
        * `EXECUTED` - Command has been executed successfully.
        """)
public enum CommandState {

    PENDING,
    EXECUTED,
    FAILED

}
