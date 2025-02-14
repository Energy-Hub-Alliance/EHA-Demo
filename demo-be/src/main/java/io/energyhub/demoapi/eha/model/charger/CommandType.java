package io.energyhub.demoapi.eha.model.charger;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "CommandType", enumAsRef = true, description = """
        The name of the command type for charger to execute.
        * `CHARGING_START` - Command to start the charging of a charger
        * `CHARGING_STOP` - Command to stop the charging of a charger
        * `SET_CHARGING_CURRENT` - Command to set amount of charging power
        * `SET_CHARGING_PHASES` - Command to control number if active phases during charging
        """)
public enum CommandType {

    CHARGING_START,
    CHARGING_STOP,
    SET_CHARGING_CURRENT,
    SET_CHARGING_PHASES

}

