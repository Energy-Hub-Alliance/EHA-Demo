package io.energyhub.demoapi.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class DemoApiConfig implements WebMvcConfigurer {

    private static final String OAUTH_SECURITY_SCHEME_NAME = "oauth_security_scheme";

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "HEAD");
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().components(new Components()
                        .addSecuritySchemes(OAUTH_SECURITY_SCHEME_NAME, getOAuthSecurityScheme()))
                .addSecurityItem(getOAuthSecurityRequirement())
                .info(getInfo());
    }

    private SecurityRequirement getOAuthSecurityRequirement() {
        return new SecurityRequirement().addList(OAUTH_SECURITY_SCHEME_NAME);
    }

    private SecurityScheme getOAuthSecurityScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.OAUTH2)
                .flows(getOAuthFlows());
    }

    private OAuthFlows getOAuthFlows() {
        return new OAuthFlows().implicit(getAuthorizationCodeFlow());
    }

    private OAuthFlow getAuthorizationCodeFlow() {
        return new OAuthFlow().authorizationUrl(issuerUri + "/protocol/openid-connect/auth");
    }

    private Info getInfo() {
        return new Info().title("EHA Demo Backend")
                .version("1.0.0");
    }


}
