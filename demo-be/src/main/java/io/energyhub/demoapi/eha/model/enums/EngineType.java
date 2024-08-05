package io.energyhub.demoapi.eha.model.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true, description = """
        The engine type of the vehicle.
        * `BEV` - Battery Electric Vehicle. Can charge.
        * `HEV` - Hybrid Electric Vehicle. Can not charge.
        * `PHEV` - Plug-in Hybrid Electric Vehicle. Can charge.
        * `ICEV` - Internal Combustion Engine Vehicle. Can not charge.
        """)
public enum EngineType {

    /**
     * Battery Electric Vehicle. Can charge.
     */
    BEV,

    /**
     * Hybrid Electric Vehicle. Can not charge.
     */
    HEV,

    /**
     * Plug-in Hybrid Electric Vehicle. Can charge.
     */
    PHEV,

    /**
     * Internal Combustion Engine Vehicle. Can not charge.
     */
    ICEV
}