package io.energyhub.demoapi.eha.model.pagination;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PageableRequest {

    @Parameter(description = "Zero-based page index (0..N).", example = "0")
    @NotNull
    @Min(0)
    protected Integer page = 0;

    @Parameter(description = "The size of the page to be returned. Default value is 10. Maximum value is 100.", example = "10")
    @Min(1)
    @NotNull
    @Max(100)
    protected Integer size = 10;

}
