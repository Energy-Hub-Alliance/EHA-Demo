package io.energyhub.demoapi.eha.model.constant;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Schema(enumAsRef = true, description = "Vendor companies used for integration.")
@Getter
public enum Vendor {

    TESLA,
    TIBBER,
    MERCEDES,
    BMW,
    MINI,
    OSTROM,
    VIESSMANN

}
