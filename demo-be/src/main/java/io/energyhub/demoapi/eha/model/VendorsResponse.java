package io.energyhub.demoapi.eha.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;


@Data
public class VendorsResponse {

    @Schema(description = "List of vehicle vendors which can be connected to the Energy Hub.",
            example = """
                    [{"id": "TESLA",
                    "name" : "Tesla",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/tesla/logo"}]
                    """)
    private List<VendorResponse> vehicles;

    @Schema(description = "List of tariff vendors which can be connected to the Energy Hub.",
            example = """
                    [{"id": "TIBBER",
                    "name" : "Tibber",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/tibber/logo"}]
                    """)
    private List<VendorResponse> tariffs;

    @Schema(description = "List of HVAC vendors which can be connected to the Energy Hub.",
            example = """
                    [{"id": "VIESSMANN",
                    "name" : "Viessmann",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/viessmann/logo"}]
                    """)
    private List<VendorResponse> hvac;

    @Schema(description = "List of charger vendors which can be connected to the Energy Hub.",
            example = """
                    [{"id": "EASEE",
                    "name" : "Easee",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/easee/logo"}]
                    """)
    private List<VendorResponse> chargers;

    @Schema(description = "List of home power vendors which can be connected to the Energy Hub.",
            example = """
                    [{"id": "FRONIUS",
                    "name" : "Fronius",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/fronius/logo"}]
                    """)
    private List<VendorResponse> homePower;


}
