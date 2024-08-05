package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.eha.model.constant.Vendor;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of tariff for linking process.")
public class TariffLinkDto {

    @NotNull
    @JsonProperty(value = "id", index = 1)
    @Schema(description = "The ID of the tariff")
    private UUID uuid;

    @NotNull
    @Schema(description = "The external ID of the tariff.", example = "8413731391660801")
    private String externalId;

    @NotNull
    @Schema(description = "Indicates if the tariff is linked with the Energy Hub Alliance.")
    private Boolean isLinked;

    @NotNull
    @Schema(description = "The vendor of the tariff.", example = "TIBBER")
    private Vendor vendor;

    @NotNull
    @Schema(description = "The country code of the tariff.", example = "DE")
    private String countryCode;

    @NotNull
    @Schema(description = "The name of the tariff.", example = "Tibber Bürgerfelder Str.")
    private String tariffName;

}
