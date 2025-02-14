package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaConnectApiClient;
import io.energyhub.demoapi.eha.model.ConnectUrlResponse;
import io.energyhub.demoapi.eha.model.HomePowerUserLinkRequest;
import io.energyhub.demoapi.eha.model.VendorsResponse;
import io.energyhub.demoapi.eha.model.charger.ChargerUserLinkRequest;
import io.energyhub.demoapi.eha.model.hvac.HvacUserLinkRequest;
import io.energyhub.demoapi.eha.model.tariff.TariffUserLinkRequest;
import io.energyhub.demoapi.eha.model.vehicle.VehicleUserLinkRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "Connection Controller")
@RestController
@Validated
public class ConnectController {

    private final EhaConnectApiClient ehaConnectApiClient;
    private final CurrentUser currentUser;

    @Operation(summary = "Return a list of vendors grouped by capabilities",
            description = """
                    Returns the list of vendors which are currently supported grouped by type.
                    This list is extended when new vendors are added to the Energy Hub.""")
    @GetMapping("available-vendors")
    public VendorsResponse getAllAvailableVendors() {
        return ehaConnectApiClient.getAllAvailableVendors();
    }

    @Operation(summary = "Connect URL for a vehicle vendor", description = "Creates a connect URL to redirect to the IDP of the specified vehicle vendor.")
    @GetMapping("connect/vehicles/{vendor}")
    public ConnectUrlResponse createConnectUrlForVehicleVendor(
            @Parameter(description = "The vehicle vendor enum to start the connect session.") @PathVariable String vendor,
            @Parameter(description = "Vehicle identification number. Required when listed in 'required' list of available vendors endpoint.") @RequestParam(required = false) String vin,
            @Parameter(description = "The URL to which user will be redirected.") @RequestParam String redirectUrl
    ) {
        VehicleUserLinkRequest vehicleUserLinkRequest = new VehicleUserLinkRequest();
        vehicleUserLinkRequest.setVendor(vendor);
        vehicleUserLinkRequest.setVin(vin);
        vehicleUserLinkRequest.setUserId(currentUser.getCurrentUser().getUserId());
        vehicleUserLinkRequest.setRedirectUrl(redirectUrl);

        return ehaConnectApiClient.createConnectUrlForVehicleVendor(vehicleUserLinkRequest);
    }

    @Operation(summary = "Connect URL for a tariff vendor", description = "Creates a connect URL to redirect to the IDP of the specified tariff vendor.")
    @GetMapping("connect/tariffs/{vendor}")
    public ConnectUrlResponse createConnectUrlForTariffVendor(
            @Parameter(description = "The tariff vendor enum to start the connect session.") @PathVariable String vendor,
            @Parameter(description = "The URL to which user will be redirected.") @RequestParam String redirectUrl
    ) {
        TariffUserLinkRequest tariffUserLinkRequest = new TariffUserLinkRequest();
        tariffUserLinkRequest.setVendor(vendor);
        tariffUserLinkRequest.setUserId(currentUser.getCurrentUser().getUserId());
        tariffUserLinkRequest.setRedirectUrl(redirectUrl);

        return ehaConnectApiClient.createConnectUrlForTariffVendor(tariffUserLinkRequest);
    }

    @Operation(summary = "Connect URL for a hvac vendor", description = "Creates a connect URL to redirect to the IDP of the specified hvac vendor.")
    @GetMapping("connect/hvacs/{vendor}")
    public ConnectUrlResponse createConnectUrlForHvacVendor(
            @Parameter(description = "The hvac vendor enum to start the connect session.") @PathVariable String vendor,
            @Parameter(description = "The URL to which user will be redirected.") @RequestParam String redirectUrl
    ) {
        HvacUserLinkRequest hvacUserLinkRequest = new HvacUserLinkRequest();
        hvacUserLinkRequest.setVendor(vendor);
        hvacUserLinkRequest.setUserId(currentUser.getCurrentUser().getUserId());
        hvacUserLinkRequest.setRedirectUrl(redirectUrl);

        return ehaConnectApiClient.createConnectUrlForHvacVendor(hvacUserLinkRequest);
    }


    @Operation(summary = "Connect URL for a home-power vendor", description = "Creates a connect URL to redirect to the IDP of the specified home-power vendor.")
    @GetMapping("connect/home-powers/{vendor}")
    public ConnectUrlResponse createConnectUrlForHomePowerVendor(
            @Parameter(description = "The home-power vendor enum to start the connect session.") @PathVariable String vendor,
            @Parameter(description = "The URL to which user will be redirected.") @RequestParam String redirectUrl
    ) {
        HomePowerUserLinkRequest homePowerUserLinkRequest = new HomePowerUserLinkRequest();
        homePowerUserLinkRequest.setVendor(vendor);
        homePowerUserLinkRequest.setUserId(currentUser.getCurrentUser().getUserId());
        homePowerUserLinkRequest.setRedirectUrl(redirectUrl);

        return ehaConnectApiClient.createConnectUrlForHomePowerVendor(homePowerUserLinkRequest);
    }

    @Operation(summary = "Connect URL for a charger vendor",
            description = "Creates a connect URL to redirect to the IDP of the specified charger vendor.")
    @GetMapping("connect/chargers/{vendor}")
    public ConnectUrlResponse createConnectUrlForEvChargerVendor(
            @Parameter(description = "The charger vendor enum to start the connect session.") @PathVariable String vendor,
            @Parameter(description = "The URL to which user will be redirected.") @RequestParam String redirectUrl
    ) {
        ChargerUserLinkRequest chargerUserLinkRequest = new ChargerUserLinkRequest();
        chargerUserLinkRequest.setVendor(vendor);
        chargerUserLinkRequest.setUserId(currentUser.getCurrentUser().getUserId());
        chargerUserLinkRequest.setRedirectUrl(redirectUrl);

        return ehaConnectApiClient.createConnectUrlForChargerVendor(chargerUserLinkRequest);
    }
}
