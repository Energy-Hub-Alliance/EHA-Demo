package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.*;
import io.energyhub.demoapi.eha.model.battery.BatteriesAddingRequest;
import io.energyhub.demoapi.eha.model.battery.BatteryLinkDto;
import io.energyhub.demoapi.eha.model.charger.ChargerLinkDto;
import io.energyhub.demoapi.eha.model.charger.ChargersAddingRequest;
import io.energyhub.demoapi.eha.model.hvac.HvacLinkDto;
import io.energyhub.demoapi.eha.model.hvac.HvacsAddingRequest;
import io.energyhub.demoapi.eha.model.meter.MeterLinkDto;
import io.energyhub.demoapi.eha.model.meter.MetersAddingRequest;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.pagination.PageableRequest;
import io.energyhub.demoapi.eha.model.inverter.PvInverterLinkDto;
import io.energyhub.demoapi.eha.model.inverter.PvInvertersAddingRequest;
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
    private final EhaBatteryApiClient ehaBatteryApiClient;
    private final EhaPvInverterApiClient ehaPvInverterApiClient;
    private final EhaMeterApiClient ehaMeterApiClient;
    private final EhaChargerApiClient ehaChargerApiClient;


    @Operation(summary = "Link list of vehicles from end user`s vendor account", description = "Connects the provided list of vehicles from the vendor account to the Energy Hub.")
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
            description = "Connects the provided list of tariffs from the vendor account to the Energy Hub.")
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
            description = "Connects the provided list of hvacs from the vendor account to the Energy Hub.")
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

    @Operation(summary = "Link batteries from vendor account",
            description = "Connects the provided list of batteries from the vendor account to the Energy Hub.")
    @PostMapping("/batteries")
    public List<BatteryLinkDto> linkBatteriesFromEndUsersVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid BatteriesAddingRequest batteriesAddingRequest
    ) {
        return ehaBatteryApiClient.linkBatteriesFromEndUsersVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                batteriesAddingRequest);
    }

    @Operation(summary = "List batteries from vendor",
            description = "Returns connected batteries for the vendor account directly from vendor system.")
    @GetMapping("/batteries")
    public PageResponse<BatteryLinkDto> getAllBatteriesFromVendor(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @ParameterObject @Valid PageableRequest pageableRequest
    ) {
        return ehaBatteryApiClient.getAllBatteriesFromVendor(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pageableRequest.getPage(),
                pageableRequest.getSize());
    }

    @Operation(summary = "Link PV inverters",
            description = "Connects the provided list of PV inverters from the vendor account to the Energy Hub.")
    @PostMapping("/pv-inverters")
    public List<PvInverterLinkDto> linkPvInvertersFromEndUsersVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid PvInvertersAddingRequest pvInvertersAddingRequest
    ) {
        return ehaPvInverterApiClient.linkPvInvertersToVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pvInvertersAddingRequest);
    }

    @Operation(summary = "List PV inverters from vendor",
            description = "Returns connected PV inverters for the vendor account directly from vendor system.")
    @GetMapping("/pv-inverters")
    public PageResponse<PvInverterLinkDto> getConnectedPvInvertersFromVendorForVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @ParameterObject @Valid PageableRequest pageableRequest) {
        return ehaPvInverterApiClient.getAllPvInvertersFromVendor(currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pageableRequest.getPage(),
                pageableRequest.getSize());
    }

    @Operation(summary = "Link meters from vendor account",
            description = "Connects the provided list of meters from the vendor account to the Energy Hub.")
    @PostMapping("/meters")
    public List<MeterLinkDto> linkMetersFromEndUsersVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid MetersAddingRequest metersAddingRequest
    ) {
        return ehaMeterApiClient.linkMetersFromEndUsersVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                metersAddingRequest);
    }

    @Operation(summary = "List meters from vendor",
            description = "Returns connected meters for the vendor account directly from vendor system.")
    @GetMapping("/meters")
    public PageResponse<MeterLinkDto> getAllMetersFromVendor(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @ParameterObject @Valid PageableRequest pageableRequest
    ) {
        return ehaMeterApiClient.getAllMetersFromVendor(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pageableRequest.getPage(),
                pageableRequest.getSize());
    }



    @Operation(summary = "Link chargers from vendor account",
            description = "Connects the provided list of chargers from the vendor account to the Energy Hub.")
    @PostMapping("/chargers")
    public List<ChargerLinkDto> linkChargersFromEndUsersVendorAccount(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid ChargersAddingRequest chargersAddingRequest
    ) {
        return ehaChargerApiClient.linkChargersFromEndUsersVendorAccount(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                chargersAddingRequest);
    }

    @Operation(summary = "List chargers from vendor",
            description = "Returns connected chargers for the vendor account directly from vendor system.")
    @GetMapping("/chargers")
    public PageResponse<ChargerLinkDto> getAllChargersFromVendor(
            @Parameter(description = "Vendor account ID") @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @ParameterObject @Valid PageableRequest pageableRequest
    ) {
        return ehaChargerApiClient.getAllChargersFromVendor(
                currentUser.getCurrentUser().getUserId(),
                vendorAccountUuid,
                pageableRequest.getPage(),
                pageableRequest.getSize());
    }
}
