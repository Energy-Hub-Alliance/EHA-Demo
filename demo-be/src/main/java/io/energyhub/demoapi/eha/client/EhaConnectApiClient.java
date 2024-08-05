package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.ConnectUrlResponse;
import io.energyhub.demoapi.eha.model.VendorsResponse;
import io.energyhub.demoapi.eha.model.hvac.HvacUserLinkRequest;
import io.energyhub.demoapi.eha.model.tariff.TariffUserLinkRequest;
import io.energyhub.demoapi.eha.model.vehicle.VehicleUserLinkRequest;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "ehaConnectApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaConnectApiClient {

    @PostMapping("v1.0.0/connections/vehicles")
    ConnectUrlResponse createConnectUrlForVehicleVendor(@RequestBody VehicleUserLinkRequest request);

    @PostMapping("v1.0.0/connections/tariffs")
    ConnectUrlResponse createConnectUrlForTariffVendor(@RequestBody TariffUserLinkRequest request);

    @GetMapping("v1.0.0/connections/available-vendors")
    VendorsResponse getAllAvailableVendors();

    @GetMapping("v1.0.0/connections/hvacs")
    ConnectUrlResponse createConnectUrlForHvacVendor(@RequestBody HvacUserLinkRequest request);

}
