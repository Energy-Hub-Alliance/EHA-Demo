package io.energyhub.demoapi.eha.model.sse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SseMessageDto {

    private String type;
    private Object data;

}
