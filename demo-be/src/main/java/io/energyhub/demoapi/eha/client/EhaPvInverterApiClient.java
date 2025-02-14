package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.inverter.PvInverterLinkDto;
import io.energyhub.demoapi.eha.model.inverter.PvInverterResponse;
import io.energyhub.demoapi.eha.model.inverter.PvInverterShortResponse;
import io.energyhub.demoapi.eha.model.inverter.PvInvertersAddingRequest;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.DeviceForUserSortRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "ehaPvInverterApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaPvInverterApiClient {

    @GetMapping("v1.0.0/users/{userId}/pv-inverters")
    PageResponse<PvInverterShortResponse> getAllPvInverters(@PathVariable String userId,
                                                            @SpringQueryMap DeviceForUserSortRequest request);

    @GetMapping("v1.0.0/users/{userId}/pv-inverters/{pvInverterId}")
    PvInverterResponse getSinglePvInverter(@PathVariable String userId,
                                                        @PathVariable(name = "pvInverterId") UUID pvInverterUuid);

    @GetMapping("v1.0.0/users/{userId}/pv-inverters/{pvInverterId}/refresh")
    PvInverterResponse updatePvInverter(@PathVariable String userId,
                                  @PathVariable(name = "pvInverterId") UUID pvInverterUuid);

    @DeleteMapping("v1.0.0/users/{userId}/pv-inverters/{pvInverterId}")
    SuccessMessageDto deletePvInverter(@PathVariable String userId,
                                    @PathVariable(name = "pvInverterId") UUID pvInverterUuid);


    @GetMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/pv-inverters")
    PageResponse<PvInverterLinkDto> getAllPvInvertersFromVendor(@PathVariable String userId,
                                                           @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                           @RequestParam Integer page,
                                                           @RequestParam Integer size);

    @PostMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/pv-inverters")
    List<PvInverterLinkDto> linkPvInvertersToVendorAccount(@PathVariable String userId,
                                                           @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                           @RequestBody PvInvertersAddingRequest pvInvertersAddingRequest);

}
