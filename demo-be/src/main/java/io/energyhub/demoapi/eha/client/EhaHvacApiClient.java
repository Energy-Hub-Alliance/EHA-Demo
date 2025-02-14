package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.ScheduleResponse;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.hvac.HvacLinkDto;
import io.energyhub.demoapi.eha.model.hvac.HvacResponse;
import io.energyhub.demoapi.eha.model.hvac.HvacShortResponse;
import io.energyhub.demoapi.eha.model.hvac.HvacsAddingRequest;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.DeviceForUserSortRequest;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "ehaHvacApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaHvacApiClient {

    @GetMapping("v1.0.0/users/{userId}/hvacs")
    PageResponse<HvacShortResponse> getAllHvacs(@PathVariable String userId,
                                                @SpringQueryMap DeviceForUserSortRequest request);

    @GetMapping("v1.0.0/users/{userId}/hvacs/{hvacId}")
    HvacResponse getHvacByHvacUuid(@PathVariable String userId,
                                   @PathVariable(name = "hvacId") UUID hvacUuid);

    @DeleteMapping("v1.0.0/users/{userId}/hvacs/{hvacId}")
    SuccessMessageDto deleteHvac(@PathVariable String userId,
                                 @PathVariable(name = "hvacId") UUID hvacUuid);

    @GetMapping("v1.0.0/users/{userId}/hvacs/{hvacId}/refresh")
    HvacResponse refreshHvacForUser(
            @Parameter(description = "User ID") @PathVariable String userId,
            @Parameter(description = "Hvac ID") @PathVariable(name = "hvacId") UUID hvacUuid
    );

    @GetMapping("v1.0.0/users/{userId}/hvacs/{hvacId}/schedules")
    ScheduleResponse getSchedule(
            @PathVariable String userId,
            @PathVariable(name = "hvacId") UUID hvacId
    );

    @GetMapping(value = "v1.0.0/users/{userId}/hvacs/{hvacId}/image.png", produces = MediaType.IMAGE_PNG_VALUE)
    byte[] getHvacImageForUser(
            @PathVariable String userId,
            @PathVariable(name = "hvacId") UUID hvacUuid
    );

    @PostMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/hvacs")
    List<HvacLinkDto> linkHvacsFromEndUsersVendorAccount(
            @Parameter(description = "User ID") @PathVariable String userId,
            @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestBody @Valid HvacsAddingRequest hvacsAddingRequest
    );

    @GetMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/hvacs")
    PageResponse<HvacLinkDto> getConnectedHvacsFromVendorForVendorAccount(
            @Parameter(description = "User ID") @PathVariable String userId,
            @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
            @RequestParam Integer page,
            @RequestParam Integer size
    );
}
