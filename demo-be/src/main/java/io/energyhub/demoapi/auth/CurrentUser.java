package io.energyhub.demoapi.auth;

import io.energyhub.demoapi.model.DemoApiUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CurrentUser {

    public DemoApiUser getCurrentUser() {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        return new DemoApiUser(token.getToken().getClaims().get("name").toString(), token.getName());
    }

}
