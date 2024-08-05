package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TariffResponse {

    @NotNull
    @JsonProperty(value = "id", index = 1)
    @Schema(description = "The ID of the tariff")
    private UUID uuid;

    @NotNull
    @Schema(description = "The ID of the user.", example = "12345")
    private String userId;

    @Schema(description = "The location ID.", example = "7364fc92-20e1-4033-ac18-cb19c35e97e0")
    private UUID locationId;

    @NotNull
    @Schema(description = "The currency of tariff prices and costs.", example = "EUR")
    private String currency;

    @NotNull
    @Schema(description = "The country of the tariff in ISO 3166-1 alpha-2 format.", example = "DE")
    private String countryCode;

    @Schema(description = "The timestamp of the last update of any variable of the tariff.")
    private LocalDateTime lastUpdated;

    @NotNull
    @Schema(description = "Indicates if the tariff is reachable trough the vendor system.", example = "true")
    private Boolean isOnline;

    @Schema(description = "The vendor of the tariff.", example = "TIBBER")
    @NotNull
    private Vendor vendor;

    @NotNull
    @Schema(description = "The name of the tariff.", example = "Tibber Bürgerfelder Str.")
    private String tariffName;

}
