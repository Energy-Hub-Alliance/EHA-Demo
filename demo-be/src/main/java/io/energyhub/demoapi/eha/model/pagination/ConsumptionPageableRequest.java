package io.energyhub.demoapi.eha.model.pagination;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class ConsumptionPageableRequest {

    @Parameter(description = "Zero-based page index (0..N)", example = "0")
    @Min(0)
    protected Integer page = 0;

    @Parameter(description = "The size of the page to be returned. Default value is 100. Maximum value is 2000.", example = "100")
    @Min(1)
    @Max(2000)
    protected Integer size = 100;

}
