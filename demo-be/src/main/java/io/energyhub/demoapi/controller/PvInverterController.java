package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaPvInverterApiClient;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.inverter.PvInverterResponse;
import io.energyhub.demoapi.eha.model.inverter.PvInverterShortResponse;
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
@RequestMapping("pv-inverters")
@RequiredArgsConstructor
@Tag(name = "PV Inverter Controller")
public class PvInverterController {

    private final EhaPvInverterApiClient ehaPvInverterApiClient;
    private final CurrentUser currentUser;

    @Operation(summary = "All PV inverters for user", description = "Returns a paginated list of all PV inverters for the user.")
    @GetMapping
    public PageResponse<PvInverterShortResponse> getAllPvInvertersForUser(
            @ParameterObject @Valid DeviceForUserSortRequest request
    ) {
        return ehaPvInverterApiClient.getAllPvInverters(currentUser.getCurrentUser().getUserId(), request);
    }

    @Operation(summary = "PV inverter data for user", description = "Returns PV inverter data of a single PV inverter for the user.")
    @GetMapping("/{pvInverterId}")
    public PvInverterResponse getSinglePvInverterForUser(
            @Parameter(description = "PV inverter ID") @PathVariable(name = "pvInverterId") UUID pvInverterUuid
    ) {
        return ehaPvInverterApiClient.getSinglePvInverter(currentUser.getCurrentUser().getUserId(), pvInverterUuid);
    }

    @Operation(summary = "Refresh PV inverter data for user", description = "Updates PV inverter with newest data from vendor system for the user.")
    @GetMapping("/{pvInverterId}/refresh")
    public PvInverterResponse refreshPvInverterForUser(
            @Parameter(description = "PV inverter ID") @PathVariable(name = "pvInverterId") UUID pvInverterUuid
    ) {
        return ehaPvInverterApiClient.updatePvInverter(currentUser.getCurrentUser().getUserId(), pvInverterUuid);
    }

    @Operation(summary = "Delete PV inverter for user", description = "Deletes the PV inverter for the user.")
    @DeleteMapping("/{pvInverterId}")
    public SuccessMessageDto deletePvInverterForUser(
            @Parameter(description = "PV inverter ID") @PathVariable(name = "pvInverterId") UUID pvInverterUuid
    ) {
        ehaPvInverterApiClient.deletePvInverter(currentUser.getCurrentUser().getUserId(), pvInverterUuid);
        return new SuccessMessageDto();
    }

}
