package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.VehicleResponse;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.VehicleSortRequest;
import io.energyhub.demoapi.eha.model.vehicle.VehicleLinkDto;
import io.energyhub.demoapi.eha.model.vehicle.VehicleShortResponse;
import io.energyhub.demoapi.eha.model.vehicle.VehiclesAddingRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "ehaVehicleApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaVehicleApiClient {

    @GetMapping("v1.0.0/users/{userId}/vehicles")
    PageResponse<VehicleShortResponse> getAllVehiclesByUserId(@PathVariable String userId,
                                                              @SpringQueryMap VehicleSortRequest request);

    @GetMapping("v1.0.0/users/{userId}/vehicles/{vehicleId}")
    VehicleResponse getVehiclesByUserIdAndVehicleId(@PathVariable String userId, @PathVariable(name = "vehicleId") UUID vehicleUuid);

    @GetMapping("v1.0.0/users/{userId}/vehicles/{vehicleId}/refresh")
    VehicleResponse refresh(@PathVariable String userId, @PathVariable(name = "vehicleId") UUID vehicleUuid);

    @DeleteMapping("v1.0.0/users/{userId}/vehicles/{vehicleId}")
    SuccessMessageDto deleteVehicle(@PathVariable String userId, @PathVariable(name = "vehicleId") UUID vehicleUuid);

    @GetMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/vehicles")
    PageResponse<VehicleLinkDto> getConnectedFromVendorForVendorAccount(@PathVariable String userId,
                                                                            @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                                            @RequestParam Integer page,
                                                                            @RequestParam Integer size);

    @PostMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/vehicles")
    List<VehicleLinkDto> linkVehiclesFromEndUserVendorAccount(@RequestBody VehiclesAddingRequest vehiclesAddingRequest,
                                                              @PathVariable String userId,
                                                              @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid);


    @GetMapping(value = "v1.0.0/users/{userId}/vehicles/{vehicleId}/image.png", produces = MediaType.IMAGE_PNG_VALUE)
    byte[] getVehicleImage(@PathVariable String userId, @PathVariable UUID vehicleId);
}
