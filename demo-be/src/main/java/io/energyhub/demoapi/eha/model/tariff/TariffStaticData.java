package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Object of static data of a tariff.")
public class TariffStaticData {

    @NotNull
    @Schema(description = "The currency of tariff prices and costs.", example = "EUR")
    @JsonProperty(index = 3)
    private String currency;

    @NotNull
    @Schema(description = "The country of the tariff in ISO 3166-1 alpha-2 format.", example = "DE")
    @JsonProperty(index = 4)
    private String countryCode;

    @Schema(description = "The timestamp of the last update of any variable of the tariff.")
    @JsonProperty(index = 5)
    private LocalDateTime lastUpdated;

    @NotNull
    @Schema(description = "The vendor of the tariff.", example = "OSTROM")
    @JsonProperty(index = 1)
    private String vendor;

    @NotNull
    @Schema(description = "The name of the tariff.", example = "Tibber Bürgerfelder Str.")
    @JsonProperty(index = 2)
    private String name;
}
