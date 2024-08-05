package io.energyhub.demoapi.config.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import io.energyhub.demoapi.config.jackson.LocalDateTimeDeserializer;
import org.springframework.kafka.support.JacksonUtils;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.time.LocalDateTime;

public class KafkaJsonDeserializer extends JsonDeserializer<Object> {

    public KafkaJsonDeserializer() {
        super(customizedObjectMapper());
    }

    private static ObjectMapper customizedObjectMapper() {
        ObjectMapper mapper = JacksonUtils.enhancedObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        SimpleModule localDateTimeSerialization = new SimpleModule();
        localDateTimeSerialization.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer());

        mapper.registerModule(localDateTimeSerialization);

        return mapper;
    }
}
