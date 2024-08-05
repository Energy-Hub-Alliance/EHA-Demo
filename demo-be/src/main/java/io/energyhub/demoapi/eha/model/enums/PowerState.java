package io.energyhub.demoapi.eha.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true, description = """
        The current charging state of the vehicle.
        * `PLUGGED` - The power state is plugged.
        * `UNPLUGGED` - The power state is unplugged.
        * `CHARGING` - The power state is charging.
        * `PREPARING` - The power state is preparing.
        * `FINISHED` - The power state is finished.
        * `STOPPED` - The power state is stopped.
        * `FAULT` - The power state is in fault.""")
public enum PowerState {

    /**
     * The power state is plugged.
     */
    @JsonProperty("Plugged")
    PLUGGED,

    /**
     * The power state is unplugged.
     */
    @JsonProperty("Unplugged")
    UNPLUGGED,

    /**
     * The power state is charging.
     */
    @JsonProperty("Charging")
    CHARGING,

    /**
     * The power state is preparing.
     */
    @JsonProperty("Preparing")
    PREPARING,

    /**
     * The power state is finished.
     */
    @JsonProperty("Finished")
    FINISHED,

    /**
     * The charging has stopped.
     */
    @JsonProperty("Stopped")
    STOPPED,

    /**
     * The power state is in fault.
     */
    @JsonProperty("Fault")
    FAULT
}
