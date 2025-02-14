package io.energyhub.demoapi.eha.model.vehicle;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "CommandType", enumAsRef = true, description = """
        The name of the commandType for vehicle to execute.
        * `CHARGING_START` - Command to start the charging of a vehicle
        * `CHARGING_STOP` - Command to stop the charging of a vehicle
        """)
public enum CommandType {

    CHARGING_START,
    CHARGING_STOP

}
