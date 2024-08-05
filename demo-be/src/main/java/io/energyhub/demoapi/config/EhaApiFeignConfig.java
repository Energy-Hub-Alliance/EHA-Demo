package io.energyhub.demoapi.config;

import feign.RequestInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class EhaApiFeignConfig {

    @Value("${demo-app.api-key}")
    private String demoAppKey;

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> requestTemplate.header("X-API-KEY", demoAppKey);
    }

}
