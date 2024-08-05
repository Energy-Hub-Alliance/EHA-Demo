package io.energyhub.demoapi.eha.model.sort;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class HvacSortRequest extends PageableSortRequest {

    @Parameter(description = "Sorting field. Default value is USER_ID.", example = "USER_ID")
    @NotNull
    HvacSortField sortField = HvacSortField.USER_ID;

}
