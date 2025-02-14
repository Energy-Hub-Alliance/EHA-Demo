package io.energyhub.demoapi.eha.model.tariff;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceResponse {

    @NotNull
    @Schema(description = "The timestamp of the start of price interval.")
    @JsonProperty(index = 4)
    private LocalDateTime startDate;

    @NotNull
    @Schema(description = "The total price consisting of energy purchasing costs and taxes and levies.", example = "0.72")
    @JsonProperty(index = 1)
    private BigDecimal totalPrice;

    @NotNull
    @Schema(description = "The day ahead spot price of the electricity purchased.", example = "0.52")
    @JsonProperty(index = 2)
    private BigDecimal energyPrice;

    @NotNull
    @Schema(description = "The taxes and levies of the purchased energy.", example = "0.22")
    @JsonProperty(index = 3)
    private BigDecimal taxAndLevies;
}
