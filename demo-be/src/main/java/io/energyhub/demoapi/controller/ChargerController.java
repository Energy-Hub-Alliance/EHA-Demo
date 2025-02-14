package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaChargerApiClient;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.charger.*;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.DeviceForUserSortRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("chargers")
@RequiredArgsConstructor
@Tag(name = "Charger Controller")
public class ChargerController {

    private final EhaChargerApiClient ehaChargerApiClient;
    private final CurrentUser currentUser;

    @Operation(summary = "All chargers for user", description = "Returns a paginated list of all chargers that belong to the user.")
    @GetMapping
    public PageResponse<ChargerShortResponse> getAllChargerByUserId(
            @ParameterObject @Valid DeviceForUserSortRequest request
    ) {
        return ehaChargerApiClient.getAllChargerByUserId(currentUser.getCurrentUser().getUserId(), request);
    }

    @Operation(summary = "Charger data for user", description = "Returns general data of a single charger for the user.")
    @GetMapping("{chargerId}")
    public ChargerResponse getChargerByUserIdAndChargerUuid(
            @Parameter(description = "Charger ID") @PathVariable(name = "chargerId") UUID chargerUuid
    ) {
        return ehaChargerApiClient.getChargerByUserIdAndChargerUuid(currentUser.getCurrentUser().getUserId(), chargerUuid);
    }

    @Operation(summary = "Refresh charger data for user", description = "Updates charger with newest data from vendor system for the user.")
    @GetMapping("{chargerId}/refresh")
    public ChargerResponse refreshChargerForUser(
            @Parameter(description = "Charger ID") @PathVariable(name = "chargerId") UUID chargerUuid
    ) {
        return ehaChargerApiClient.refreshCharger(currentUser.getCurrentUser().getUserId(), chargerUuid);
    }

    @Operation(summary = "Delete charger for user", description = "Deletes the charger for the user.")
    @DeleteMapping("{chargerId}")
    public SuccessMessageDto deleteChargerForUser(
            @Parameter(description = "Charger ID") @PathVariable(name = "chargerId") UUID chargerUuid
    ) {
        ehaChargerApiClient.deleteCharger(currentUser.getCurrentUser().getUserId(), chargerUuid);
        return new SuccessMessageDto();
    }

    @Operation(summary = "Submit command to start charging",
            description = "This endpoint creates an asynchronously executed command request to start charging.")
    @PostMapping(value = "{chargerId}/commands/charging-start")
    public SubmitCommandResponse chargingStart(
            @Parameter(description = "Charger ID") @PathVariable(name = "chargerId") UUID chargerUuid
    ) {
        return ehaChargerApiClient.chargingStart(currentUser.getCurrentUser().getUserId(), chargerUuid);
    }

    @Operation(summary = "Submit command to stop charging",
            description = "This endpoint creates an asynchronously executed command request to stop charging.")
    @PostMapping(value = "{chargerId}/commands/charging-stop")
    public SubmitCommandResponse chargingStop(
            @Parameter(description = "Charger ID") @PathVariable(name = "chargerId") UUID chargerUuid
    ) {
        return ehaChargerApiClient.chargingStop(currentUser.getCurrentUser().getUserId(), chargerUuid);
    }

    @Operation(summary = "Submit command to control the amount of charging power", description = "This endpoint creates a command request that is asynchronously executed.")
    @PostMapping(value = "{chargerId}/commands/charging-current")
    public SubmitCommandResponse chargingCurrent(
            @Parameter(description = "Charger ID") @PathVariable(name = "chargerId") UUID chargerUuid,
            @RequestBody @Valid CommandChargingCurrentRequest request
    ) {
        return ehaChargerApiClient.chargingCurrent(currentUser.getCurrentUser().getUserId(), chargerUuid, request);
    }

    @Operation(summary = "Submit command to control the number of active phases during charging", description = "This endpoint creates a command request that is asynchronously executed.")
    @PostMapping(value = "{chargerId}/commands/charging-phases")
    public SubmitCommandResponse chargingPhases(
            @Parameter(description = "Charger ID") @PathVariable(name = "chargerId") UUID chargerUuid,
            @RequestBody @Valid CommandChargingPhasesRequest request
    ) {
        return ehaChargerApiClient.chargingPhases(currentUser.getCurrentUser().getUserId(), chargerUuid, request);
    }

}
