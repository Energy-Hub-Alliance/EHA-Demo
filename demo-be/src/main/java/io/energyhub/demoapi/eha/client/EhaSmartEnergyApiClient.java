package io.energyhub.demoapi.eha.client;

import io.energyhub.demoapi.config.EhaApiFeignConfig;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.TariffSortRequest;
import io.energyhub.demoapi.eha.model.tariff.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "ehaSmartEnergyApiClient", url = "${gateway.base-url}", configuration = EhaApiFeignConfig.class)
public interface EhaSmartEnergyApiClient {

    @GetMapping("v1.0.0/users/{userId}/tariffs")
    PageResponse<TariffResponse> getAllTariffsByUserId(@PathVariable String userId,
                                                       @SpringQueryMap TariffSortRequest request);

    @GetMapping("v1.0.0/users/{userId}/tariffs/{tariffId}")
    TariffResponse getTariffByUserIdAndTariffUuid(@PathVariable String userId,
                                                  @PathVariable UUID tariffId);

    @GetMapping("v1.0.0/users/{userId}/tariffs/{tariffId}/consumption")
    PageResponse<ConsumptionResponse> getConsumptionByUserIdAndTariffUuid(@PathVariable String userId,
                                                                          @PathVariable UUID tariffId,
                                                                          @RequestParam Integer page,
                                                                          @RequestParam Integer size);

    @GetMapping("v1.0.0/users/{userId}/tariffs/{tariffId}/prices")
    List<PriceResponse> getPricesByUserIdAndTariffId(@PathVariable String userId,
                                                     @PathVariable UUID tariffId);


    @DeleteMapping("v1.0.0/users/{userId}/tariffs/{tariffId}")
    SuccessMessageDto deleteTariff(@PathVariable String userId,
                                   @PathVariable UUID tariffId);

    @GetMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/tariffs")
    PageResponse<TariffLinkDto> getConnectedFromVendorForVendorAccount(@PathVariable String userId,
                                                                       @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid,
                                                                       @RequestParam Integer page,
                                                                       @RequestParam Integer size);

    @PostMapping("v1.0.0/link/users/{userId}/vendor-accounts/{vendorAccountId}/tariffs")
    List<TariffLinkDto> linkTariffsFromEndUserVendorAccount(@RequestBody TariffsAddingRequest tariffsAddingRequest,
                                                            @PathVariable String userId,
                                                            @PathVariable(name = "vendorAccountId") UUID vendorAccountUuid);

}
