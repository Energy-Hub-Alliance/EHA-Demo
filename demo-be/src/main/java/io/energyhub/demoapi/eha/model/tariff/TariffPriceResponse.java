package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.energyhub.demoapi.constant.DocumentationExample;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Object of tariff with prices.")
public class TariffPriceResponse {

    @NotNull
    @JsonProperty(value = "id", index = 1)
    @Schema(description = "The ID of the tariff.", example = "6eb5497d-c6bb-4290-84ef-4409fe9501f1")
    private UUID uuid;

    @NotNull
    @Schema(description = "The ID of the user.", example = DocumentationExample.USER_ID)
    @JsonProperty(index = 2)
    private String userId;

    @Schema(description = "The location ID of the tariff.", example = "7364fc92-20e1-4033-ac18-cb19c35e97e0")
    @JsonProperty(index = 3)
    private UUID locationId;

    @Schema(description = "The list of prices of the tariff.")
    @JsonProperty(index = 4)
    private List<PriceResponse> prices;
}
