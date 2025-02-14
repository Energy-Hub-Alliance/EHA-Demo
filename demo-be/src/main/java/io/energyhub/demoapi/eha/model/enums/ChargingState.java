package io.energyhub.demoapi.eha.model.enums;



public enum ChargingState {

    /**
     * The charging state is unplugged.
     */
    UNPLUGGED,

    /**
     * The charging state is charging.
     */
    CHARGING,

    /**
     * The charging state is preparing.
     */
    PREPARING,

    /**
     * The charging state is finished.
     */
    FINISHED,

    /**
     * The charging has stopped.
     */
    STOPPED,

    /**
     * The charging state is in fault.
     */

    FAULT
}