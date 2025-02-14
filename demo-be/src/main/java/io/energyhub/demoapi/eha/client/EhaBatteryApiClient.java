package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.battery.BatteriesAddingRequest;
import io.energyhub.demoapi.eha.model.battery.BatteryLinkDto;
import io.energyhub.demoapi.eha.model.battery.BatteryResponse;
import io.energyhub.demoapi.eha.model.battery.BatteryShortResponse;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.DeviceForUserSortRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "ehaBatteryApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaBatteryApiClient {

    @GetMapping("/v1.0.0/users/{userId}/batteries")
    PageResponse<BatteryShortResponse> getAllBatteriesByUserId(@PathVariable String userId,
                                                               @SpringQueryMap DeviceForUserSortRequest request);

    @GetMapping("/v1.0.0/users/{userId}/batteries/{batteryId}")
    BatteryResponse getBatteryByUserIdAndBatteryUuid(@PathVariable String userId,
                                     @PathVariable(name = "batteryId") UUID batteryUuid);

    @GetMapping("/v1.0.0/users/{userId}/batteries/{batteryId}/refresh")
    BatteryResponse refreshBatteryForUser(@PathVariable String userId,
                                  @PathVariable(name = "batteryId") UUID batteryUuid);

    @DeleteMapping("/v1.0.0/users/{userId}/batteries/{batteryId}")
    SuccessMessageDto deleteBatteryForUser(@PathVariable String userId,
                                    @PathVariable(name = "batteryId") UUID batteryUuid);


    @GetMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/batteries")
    PageResponse<BatteryLinkDto> getAllBatteriesFromVendor(@PathVariable String userId,
                                                           @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                           @RequestParam Integer page,
                                                           @RequestParam Integer size);

    @PostMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/batteries")
    List<BatteryLinkDto> linkBatteriesFromEndUsersVendorAccount(@PathVariable String userId,
                                                      @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                      @RequestBody BatteriesAddingRequest batteriesAddingRequest);

}
