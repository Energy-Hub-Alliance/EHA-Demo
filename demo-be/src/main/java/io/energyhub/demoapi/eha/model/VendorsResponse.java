package io.energyhub.demoapi.eha.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;


@Data
public class VendorsResponse {

    @Schema(description = "List of vehicle vendors which can be connected to the Energy Hub Alliance.",
            example = """
                    [{"id": "TESLA",
                    "name" : "Tesla",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/tesla/logo"}]
                    """)
    private List<VendorResponse> vehicles;

    @Schema(description = "List of tariff vendors which can be connected to the Energy Hub Alliance.",
            example = """
                    [{"id": "TIBBER",
                    "name" : "Tibber",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/tibber/logo"}]
                    """)
    private List<VendorResponse> tariffs;

    @Schema(description = "List of hvac vendors which can be connected to the Energy Hub Alliance.",
            example = """
                    [{"id": "VIESSMANN",
                    "name" : "Viessmann",
                    "required" : [],
                    "logoUrl" : "https://energy-hub.io/api/vendors/v1/viesmann/logo"}]
                    """)
    private List<VendorResponse> hvac;

}
