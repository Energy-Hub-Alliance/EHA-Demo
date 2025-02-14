package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.model.user.DemoApiUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("users")
@Tag(name = "User Controller")
@RestController
public class UserController {

    private final CurrentUser currentUser;

    @Operation(summary = "Get info for logged in user", description = "Get info for logged in user.")
    @GetMapping("me")
    public ResponseEntity<DemoApiUser> getCurrentUser() {
        return ResponseEntity.ok(currentUser.getCurrentUser());
    }

}
