package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaHvacApiClient;
import io.energyhub.demoapi.eha.client.EhaSmartEnergyApiClient;
import io.energyhub.demoapi.eha.client.EhaVehicleApiClient;
import io.energyhub.demoapi.eha.model.hvac.HvacLinkDto;
import io.energyhub.demoapi.eha.model.hvac.HvacsAddingRequest;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.pagination.PageableRequest;
import io.energyhub.demoapi.eha.model.tariff.TariffLinkDto;
import io.energyhub.demoapi.eha.model.tariff.TariffsAddingRequest;
import io.energyhub.demoapi.eha.model.vehicle.VehicleLinkDto;
import io.energyhub.demoapi.eha.model.vehicle.VehiclesAddingRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/link/vendor-accounts/{vendorAccountId}")
@Tag(name = "Link Controller")
public class VendorAccountLinkController {

    private final CurrentUser currentUser;
    private final EhaVehicleApiClient ehaVehicleApiClient;
    private final EhaSmartEnergyApiClient ehaSmartEnergyApiClient;
    private final EhaHvacApiClient ehaHvacApiClient;

    @Operation(summary = "Link list of vehicles from end user`s vendor account", description = "Connects the provided list of vehicles from the vendor account to the Energy Hub Alliance.")
    @PostMapping("vehicles")
    public List<VehicleLinkDto> linkVehiclesFromEndUserVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid VehiclesAddingRequest vehiclesAddingRequest
    ) {
        return ehaVehicleApiClient.linkVehiclesFromEndUserVendorAccount(
                vehiclesAddingRequest, currentUser.getCurrentUser().getUserId(), vendorAccountUuid);
    }

    @Operation(summary = "List vehicles from vendor",
            description = "Returns vehicles for the vendor account directly from vendor system.")
    @GetMapping("vehicles")
    public PageResponse<VehicleLinkDto> getConnectedVehiclesFromVendorForVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @ParameterObject @Valid PageableRequest pageableRequest
    ) {
        return ehaVehicleApiClient.getConnectedFromVendorForVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pageableRequest.getPage(),
                pageableRequest.getSize());
    }

    @Operation(summary = "Link tariffs from vendor account",
            description = "Returns connected tariffs for the vendor account directly from vendor system.")
    @PostMapping("tariffs")
    public List<TariffLinkDto> linkTariffsFromEndUsersVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid TariffsAddingRequest tariffsAddingRequest
    ) {
        return ehaSmartEnergyApiClient.linkTariffsFromEndUserVendorAccount(
                tariffsAddingRequest, currentUser.getCurrentUser().getUserId(), vendorAccountUuid);
    }

    @Operation(summary = "Returns tariffs for vendor account directly from vendor system",
            description = "Returns tariffs for the vendor account directly from vendor system.")
    @GetMapping("tariffs")
    public PageResponse<TariffLinkDto> getConnectedTariffsFromVendorForVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @ParameterObject @Valid PageableRequest pageableRequest
    ) {
        return ehaSmartEnergyApiClient.getConnectedFromVendorForVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pageableRequest.getPage(),
                pageableRequest.getSize());
    }

    @Operation(summary = "Link hvacs",
            description = "Connects the provided list of hvacs from the vendor account to the Energy Hub Alliance.")
    @PostMapping("hvacs")
    public List<HvacLinkDto> linkHvacsFromEndUsersVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid HvacsAddingRequest hvacsAddingRequest
    ) {
        return ehaHvacApiClient.linkHvacsFromEndUsersVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                hvacsAddingRequest);
    }

    @Operation(summary = "List hvacs from vendor",
            description = "Returns connected hvacs for the vendor account directly from vendor system.")
    @GetMapping("hvacs")
    public PageResponse<HvacLinkDto> getConnectedHvacsFromVendorForVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @ParameterObject @Valid PageableRequest pageableRequest
    ) {
        return ehaHvacApiClient.getConnectedHvacsFromVendorForVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pageableRequest.getPage(),
                pageableRequest.getSize());
    }
}
