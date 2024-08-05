package io.energyhub.demoapi.eha.model.tariff;

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
    private LocalDateTime startsAt;

    @NotNull
    @Schema(description = "The total price of 1 kWh in currency of the tariff including taxes.", example = "0.22")
    private BigDecimal totalPrice;

    @NotNull
    @Schema(description = "The taxes of the total price of the tariff.", example = "0.05")
    private BigDecimal vat;
}
