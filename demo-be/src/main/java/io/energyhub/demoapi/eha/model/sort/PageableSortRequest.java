package io.energyhub.demoapi.eha.model.sort;

import io.energyhub.demoapi.eha.model.pagination.PageableRequest;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.domain.Sort;

@Data
@EqualsAndHashCode(callSuper = true)
public class PageableSortRequest extends PageableRequest {

    @Parameter(description = "Sorting order. Default value is DESC.", example = "DESC")
    protected Sort.Direction sortOrder = Sort.Direction.DESC;

}
