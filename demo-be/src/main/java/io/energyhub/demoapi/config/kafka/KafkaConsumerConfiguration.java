package io.energyhub.demoapi.config.kafka;

import io.energyhub.demoapi.kafka.SseMessageSendingException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.util.backoff.FixedBackOff;

@Configuration
public class KafkaConsumerConfiguration {

    @Bean
    public DefaultErrorHandler defaultErrorHandler() {
        DefaultErrorHandler errorHandler = new DefaultErrorHandler(new FixedBackOff(1000, 4L));
        errorHandler.addRetryableExceptions(SseMessageSendingException.class);
        return errorHandler;
    }

}
