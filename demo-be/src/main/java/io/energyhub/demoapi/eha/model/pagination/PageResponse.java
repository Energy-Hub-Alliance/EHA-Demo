package io.energyhub.demoapi.eha.model.pagination;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class PageResponse<T> {

    @Schema(description = "Elements in the page. If there is no elements the list will be empty", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<T> content;

    @Schema(description = "Total number of elements", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private long totalElements;

    @Schema(description = "Total number of pages", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private long totalPages;

    public PageResponse(List<T> content, long totalElements, long totalPages) {
        this.content = content;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

}
