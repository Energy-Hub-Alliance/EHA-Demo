package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.meter.MeterLinkDto;
import io.energyhub.demoapi.eha.model.meter.MeterResponse;
import io.energyhub.demoapi.eha.model.meter.MeterShortResponse;
import io.energyhub.demoapi.eha.model.meter.MetersAddingRequest;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.DeviceForUserSortRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "ehaMeterApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaMeterApiClient {

    @GetMapping("/v1.0.0/users/{userId}/meters")
    PageResponse<MeterShortResponse> getAllMetersByUserId(@PathVariable String userId,
                                                               @SpringQueryMap DeviceForUserSortRequest request);

    @GetMapping("/v1.0.0/users/{userId}/meters/{meterId}")
    MeterResponse getMeterByUserIdAndMeterUuid(@PathVariable String userId,
                                               @PathVariable(name = "meterId") UUID meterUuid);

    @DeleteMapping("/v1.0.0/users/{userId}/meters/{meterId}")
    SuccessMessageDto deleteMeterForUser(@PathVariable String userId,
                                    @PathVariable(name = "meterId") UUID meterUuid);


    @GetMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/meters")
    PageResponse<MeterLinkDto> getAllMetersFromVendor(@PathVariable String userId,
                                                      @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                      @RequestParam Integer page,
                                                      @RequestParam Integer size);

    @PostMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/meters")
    List<MeterLinkDto> linkMetersFromEndUsersVendorAccount(@PathVariable String userId,
                                                      @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                      @RequestBody MetersAddingRequest metersAddingRequest);
    @GetMapping("/v1.0.0/users/{userId}/meters/{meterId}/refresh")
    MeterResponse updateMeter(@PathVariable String userId,
                              @PathVariable(name = "meterId") UUID meterUuid);
}
