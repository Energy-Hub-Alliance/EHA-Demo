package io.energyhub.demoapi.eha.model.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true, description = """
        HVAC device type.
        * `AC` - Air conditioning device.
        * `HEATPUMP` - Heat pump device.
        * `DHW` - Domestic hot water device.
        * `THERMOSTAT` - Thermostat device.
        """)
public enum HvacType {
    /**
     * Air Conditioning
     */
    AC,
    /**
     * Heat Pump
     */
    HEATPUMP,

    /**
     * Domestic Hot Water
     */
    DHW,

    /**
     * Thermostat
     */
    THERMOSTAT
}
