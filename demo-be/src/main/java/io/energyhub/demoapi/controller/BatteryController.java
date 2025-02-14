package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaBatteryApiClient;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.battery.BatteryResponse;
import io.energyhub.demoapi.eha.model.battery.BatteryShortResponse;
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
@RequestMapping("batteries")
@RequiredArgsConstructor
@Tag(name = "Battery Controller")
public class BatteryController {

    private final EhaBatteryApiClient ehaBatteryApiClient;
    private final CurrentUser currentUser;

    @Operation(summary = "All batteries for user", description = "Returns a paginated list of all batteries that belong to the user.")
    @GetMapping
    public PageResponse<BatteryShortResponse> getAllBatteriesByUserId(
            @ParameterObject @Valid DeviceForUserSortRequest request
    ) {
        return ehaBatteryApiClient.getAllBatteriesByUserId(currentUser.getCurrentUser().getUserId(), request);
    }

    @Operation(summary = "Battery data for user", description = "Returns general data of a single battery for the user.")
    @GetMapping("{batteryId}")
    public BatteryResponse getBatteryByUserIdAndBatteryUuid(
            @Parameter(description = "Battery ID") @PathVariable(name = "batteryId") UUID batteryUuid
    ) {
        return ehaBatteryApiClient.getBatteryByUserIdAndBatteryUuid(currentUser.getCurrentUser().getUserId(), batteryUuid);
    }

    @Operation(summary = "Refresh battery data for user", description = "Updates battery with newest data from vendor system for the user.")
    @GetMapping("{batteryId}/refresh")
    public BatteryResponse refreshBatteryForUser(
            @Parameter(description = "Battery ID") @PathVariable(name = "batteryId") UUID batteryUuid
    ) {
        return ehaBatteryApiClient.refreshBatteryForUser(currentUser.getCurrentUser().getUserId(), batteryUuid);
    }

    @Operation(summary = "Delete battery for user", description = "Deletes the battery for the user.")
    @DeleteMapping("{batteryId}")
    public SuccessMessageDto deleteBatteryForUser(
            @Parameter(description = "Battery ID") @PathVariable(name = "batteryId") UUID batteryUuid
    ) {
        ehaBatteryApiClient.deleteBatteryForUser(currentUser.getCurrentUser().getUserId(), batteryUuid);
        return new SuccessMessageDto();
    }
}
