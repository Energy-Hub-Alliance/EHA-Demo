package io.energyhub.demoapi.config.kafka;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.type.TypeFactory;
import io.energyhub.demoapi.config.jackson.LocalDateTimeDeserializer;
import io.energyhub.demoapi.eha.model.VehicleResponse;
import io.energyhub.demoapi.eha.model.battery.BatteryResponse;
import io.energyhub.demoapi.eha.model.charger.ChargerCommandResponse;
import io.energyhub.demoapi.eha.model.charger.ChargerResponse;
import io.energyhub.demoapi.eha.model.hvac.HvacCommandResponse;
import io.energyhub.demoapi.eha.model.hvac.HvacResponse;
import io.energyhub.demoapi.eha.model.hvac.ScheduleKafkaResponse;
import io.energyhub.demoapi.eha.model.inverter.PvInverterResponse;
import io.energyhub.demoapi.eha.model.meter.MeterResponse;
import io.energyhub.demoapi.eha.model.tariff.TariffPriceResponse;
import io.energyhub.demoapi.eha.model.tariff.TariffResponse;
import io.energyhub.demoapi.eha.model.vehicle.VehicleCommandResponse;
import org.apache.kafka.common.header.Headers;
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

    /**
     * Method which will be used by Kafka type resolver where based on topic name deserializer knows in which object to convert payload of the message
     */
    public static JavaType topicNameToMessageType(String topic, byte[] data, Headers headers) {
        String trimmedTopicName = topic.substring(topic.indexOf('.') + 1);

        Class<?> typeReference = switch (trimmedTopicName) {
            case "vehicle.connect", "vehicle.update", "vehicle.delete" -> VehicleResponse.class;
            case "vehicle.command" -> VehicleCommandResponse.class;
            case "tariff.connect", "tariff.delete" -> TariffResponse.class;
            case "tariff.price.update"-> TariffPriceResponse.class;
            case "hvac.connect", "hvac.update", "hvac.delete" -> HvacResponse.class;
            case "hvac.schedules.update" -> ScheduleKafkaResponse.class;
            case "hvac.command" -> HvacCommandResponse.class;
            case "charger.connect", "charger.update", "charger.delete" -> ChargerResponse.class;
            case "charger.command" -> ChargerCommandResponse.class;
            case "battery.connect", "battery.update", "battery.delete" -> BatteryResponse.class;
            case "pv-inverter.connect", "pv-inverter.update", "pv-inverter.delete" -> PvInverterResponse.class;
            case "meter.connect", "meter.update", "meter.delete" -> MeterResponse.class;
            default -> throw new IllegalStateException("Unexpected value: " + trimmedTopicName);
        };

        return TypeFactory.defaultInstance().constructType(typeReference);
    }
}
