package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.charger.*;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.DeviceForUserSortRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "ehaChargerApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaChargerApiClient {

    @GetMapping("v1.0.0/users/{userId}/chargers")
    PageResponse<ChargerShortResponse> getAllChargerByUserId(@PathVariable String userId,
                                                             @SpringQueryMap DeviceForUserSortRequest request);

    @GetMapping("v1.0.0/users/{userId}/chargers/{chargerId}")
    ChargerResponse getChargerByUserIdAndChargerUuid(@PathVariable String userId,
                                                     @PathVariable(name = "chargerId") UUID chargerUuid);

    @GetMapping("v1.0.0/users/{userId}/chargers/{chargerId}/refresh")
    ChargerResponse refreshCharger(@PathVariable String userId,
                                   @PathVariable(name = "chargerId") UUID chargerUuid);

    @DeleteMapping("v1.0.0/users/{userId}/chargers/{chargerId}")
    SuccessMessageDto deleteCharger(@PathVariable String userId,
                                    @PathVariable(name = "chargerId") UUID chargerUuid);

    @PostMapping("v1.0.0/users/{userId}/chargers/{chargerId}/commands/charging-start")
    SubmitCommandResponse chargingStart(@PathVariable String userId,
                                        @PathVariable(name = "chargerId") UUID chargerUuid);

    @PostMapping("v1.0.0/users/{userId}/chargers/{chargerId}/commands/charging-stop")
    SubmitCommandResponse chargingStop(@PathVariable String userId,
                                        @PathVariable(name = "chargerId") UUID chargerUuid);

    @PostMapping("v1.0.0/users/{userId}/chargers/{chargerId}/commands/charging-current")
    SubmitCommandResponse chargingCurrent(@PathVariable String userId,
                                          @PathVariable(name = "chargerId") UUID chargerUuid,
                                          @RequestBody CommandChargingCurrentRequest request);

    @PostMapping("v1.0.0/users/{userId}/chargers/{chargerId}/commands/charging-phases")
    SubmitCommandResponse chargingPhases(@PathVariable String userId,
                                         @PathVariable(name = "chargerId") UUID chargerUuid,
                                         @RequestBody CommandChargingPhasesRequest request);

    @PostMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/chargers")
    List<ChargerLinkDto> linkChargersFromEndUsersVendorAccount(@PathVariable String userId,
                                                               @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                               @RequestBody ChargersAddingRequest chargersAddingRequest);

    @GetMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/chargers")
    PageResponse<ChargerLinkDto> getAllChargersFromVendor(@PathVariable String userId,
                                                          @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                          @RequestParam Integer page,
                                                          @RequestParam Integer size);

}
