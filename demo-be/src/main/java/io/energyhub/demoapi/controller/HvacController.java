package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaHvacApiClient;
import io.energyhub.demoapi.eha.model.ScheduleResponse;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.hvac.HvacResponse;
import io.energyhub.demoapi.eha.model.hvac.HvacShortResponse;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.HvacSortRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/hvacs")
@RequiredArgsConstructor
@Tag(name = "User Hvac Controller")
public class HvacController {

    private final EhaHvacApiClient ehaHvacApiClient;
    private final CurrentUser currentUser;

    @Operation(summary = "All hvacs for user", description = "Returns a paginated list of all hvacs that belong to the user.")
    @GetMapping
    public PageResponse<HvacShortResponse> getAllHvacs(
            @ParameterObject @Valid HvacSortRequest request
    ) {
        return ehaHvacApiClient.getAllHvacs(currentUser.getCurrentUser().getUserId(), request);
    }

    @Operation(summary = "Hvac data for user", description = "Returns general data of a single hvac for the user.")
    @GetMapping("{hvacId}")
    public HvacResponse getHvacByHvacUuid(
            @Parameter(description = "Hvac ID") @PathVariable(name = "hvacId") UUID hvacUuid
    ) {
        return ehaHvacApiClient.getHvacByHvacUuid(currentUser.getCurrentUser().getUserId(), hvacUuid);
    }

    @Operation(summary = "Delete hvac for user", description = "Deletes the hvac for the user.")
    @DeleteMapping("{hvacId}")
    public SuccessMessageDto deleteHvac(@Parameter(description = "Hvac ID") @PathVariable(name = "hvacId") UUID hvacUuid) {
        ehaHvacApiClient.deleteHvac(currentUser.getCurrentUser().getUserId(), hvacUuid);
        return new SuccessMessageDto();
    }

    @Operation(summary = "Refresh hvac data for user", description = "Updates hvac with newest data from vendor system for the user.")
    @GetMapping("{hvacId}/refresh")
    public HvacResponse refreshHvacForUser(
            @Parameter(description = "Hvac ID") @PathVariable(name = "hvacId") UUID hvacUuid
    ) {
        return ehaHvacApiClient.refreshHvacForUser(currentUser.getCurrentUser().getUserId(), hvacUuid);
    }

    @Operation(summary = "All schedules by user and hvac", description = "Returns all schedules by user and hvac.")
    @GetMapping("{hvacId}/schedules")
    public ScheduleResponse getSchedule(@Parameter(description = "Hvac ID") @PathVariable(name = "hvacId") UUID hvacId
    ) {
        return ehaHvacApiClient.getSchedule(currentUser.getCurrentUser().getUserId(), hvacId);
    }

    @Operation(summary = "Hvac image for user", description = "Returns the hvac image as png file for the user.")
    @GetMapping(value = "{hvacId}/image.png", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getHvacImageForUser(
            @Parameter(description = "Hvac ID") @PathVariable(name = "hvacId") UUID hvacUuid,
            HttpServletResponse response
    ) {
        try {
            byte[] image = ehaHvacApiClient.getHvacImageForUser(currentUser.getCurrentUser().getUserId(), hvacUuid);
            response.setContentType(MediaType.IMAGE_PNG_VALUE);
            response.addHeader("Cache-Control", "max-age=600000, must-revalidate, no-transform");
            return image;
        } catch (Exception e) {
            response.addHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            response.addHeader("Expires", "0");
            throw e;
        }
    }

}
