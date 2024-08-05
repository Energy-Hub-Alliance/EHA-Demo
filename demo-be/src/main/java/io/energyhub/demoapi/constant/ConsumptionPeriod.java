package io.energyhub.demoapi.constant;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true, description = """
        The unit representing consumption period based on which data will be aggregated.
        * `TODAY` - Hourly presentation of consumption
        * `WEEK` - Weekly presentation of consumption
        * `MONTH` - Monthly presentation of consumption
        """)
public enum ConsumptionPeriod {
    TODAY,
    WEEK,
    MONTH
}
