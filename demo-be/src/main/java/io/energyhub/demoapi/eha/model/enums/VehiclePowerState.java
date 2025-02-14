package io.energyhub.demoapi.eha.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true, description = """
        The current charging state of the vehicle.
        * `UNPLUGGED` - The power state is unplugged.
        * `CHARGING` - The power state is charging.
        * `PREPARING` - The power state is preparing.
        * `FINISHED` - The power state is finished.
        * `STOPPED` - The power state is stopped.
        * `FAULT` - The power state is in fault.""")
public enum VehiclePowerState {

    /**
     * The power state is unplugged.
     */
    UNPLUGGED,

    /**
     * The power state is charging.
     */
    CHARGING,

    /**
     * The power state is preparing.
     */
    PREPARING,

    /**
     * The power state is finished.
     */
    FINISHED,

    /**
     * The charging has stopped.
     */
    STOPPED,

    /**
     * The power state is in fault.
     */
    FAULT
}
