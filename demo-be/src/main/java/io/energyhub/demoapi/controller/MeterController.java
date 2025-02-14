package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaMeterApiClient;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.meter.MeterResponse;
import io.energyhub.demoapi.eha.model.meter.MeterShortResponse;
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
@RequestMapping("meters")
@RequiredArgsConstructor
@Tag(name = "Meter Controller")
public class MeterController {

    private final EhaMeterApiClient ehaMeterApiClient;
    private final CurrentUser currentUser;
    @Operation(summary = "All meters for user", description = "Returns a paginated list of all meters that belong to the user.")
    @GetMapping
    public PageResponse<MeterShortResponse> getAllMetersByUserId(
            @ParameterObject @Valid DeviceForUserSortRequest request
    ) {
        return ehaMeterApiClient.getAllMetersByUserId(currentUser.getCurrentUser().getUserId(), request);
    }

    @Operation(summary = "Meter data for user", description = "Returns general data of a single meter for the user.")
    @GetMapping("{meterId}")
    public MeterResponse getMeterByUserIdAndMeterUuid(
            @Parameter(description = "Meter ID") @PathVariable(name = "meterId") UUID meterUuid
    ) {
        return ehaMeterApiClient.getMeterByUserIdAndMeterUuid(currentUser.getCurrentUser().getUserId(), meterUuid);
    }

    @Operation(summary = "Delete meter for user", description = "Deletes the meter for the user.")
    @DeleteMapping("{meterId}")
    public SuccessMessageDto deleteMeterForUser(
            @Parameter(description = "Meter ID") @PathVariable(name = "meterId") UUID meterUuid
    ) {
        ehaMeterApiClient.deleteMeterForUser(currentUser.getCurrentUser().getUserId(), meterUuid);
        return new SuccessMessageDto();
    }
    @Operation(summary = "Refresh meter data for user", description = "Updates meter with newest data from vendor system for the user.")
    @GetMapping("{meterId}/refresh")
    public MeterResponse refreshMeterForUser(
            @Parameter(description = "Meter ID") @PathVariable(name = "meterId") UUID meterUuid
    ) {
        return ehaMeterApiClient.updateMeter(currentUser.getCurrentUser().getUserId(), meterUuid);
    }
}
