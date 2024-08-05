package io.energyhub.demoapi.eha.model.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true, description = """
        Operating mode of HVAC device.
        * `HEAT` - Heating operating mode.
        * `COOL` - Cooling operating mode.
        * `AUTO` - Automatic operating mode.
        * `REDUCED` - Reduced operating mode.
        * `OFF` - Turned off device.
        """)
public enum Mode {
    /**
     * Heating operating mode.
     */
    HEAT,
    /**
     * Cooling operating mode.
     */
    COOL,
    /**
     * Cooling operating mode.
     */
    AUTO,
    /**
     * Reduced operating mode.
     */
    REDUCED,
    /**
     * Turned off device.
     */
    OFF
}