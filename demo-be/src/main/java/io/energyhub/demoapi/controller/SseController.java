package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.service.SseService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@RequiredArgsConstructor
@RequestMapping("sse")
@Tag(name = "Sse Controller")
@RestController
public class SseController {

    private final SseService sseService;
    private final CurrentUser currentUser;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getSseStream() {
        return sseService.createEmitter(currentUser.getCurrentUser().getUserId());
    }
}
