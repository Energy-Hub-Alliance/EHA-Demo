package io.energyhub.demoapi.eha.model.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true, description = """
        The mode of the temperature target.
        * `HEAT` - Heating operating mode.
        * `COOL` - Cooling operating mode.
        * `DRY` - Drying operating mode.
        * `AUTO` - Automatic operating mode.
        * `REDUCED` - Reduced operating mode.
        * `OFF` - Turned off device.
        """)
public enum HvacMode {
    /**
     * Heating operating mode.
     */
    HEAT,
    /**
     * Cooling operating mode.
     */
    COOL,
    /**
     * Dry operating mode.
     */
    DRY,
    /**
     * Automatic operating mode.
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
