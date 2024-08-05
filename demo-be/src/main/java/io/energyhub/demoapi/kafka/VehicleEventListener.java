package io.energyhub.demoapi.kafka;

import io.energyhub.demoapi.eha.model.VehicleResponse;
import io.energyhub.demoapi.service.SseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@AllArgsConstructor
public class VehicleEventListener {

    private final SseService sseService;

    @KafkaListener(topics = "#{'${demo-app.topics}'.split(',')}",
            properties = { "spring.json.value.default.type=io.energyhub.demoapi.eha.model.VehicleResponse" })
    public void vehicleEvent(@Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
                             @Payload VehicleResponse vehicleDto,
                             Acknowledgment acknowledgment) {
        log.info("Received {} message: {}", topic, vehicleDto);
        if (topic.contains("vehicle.update")) {
            try {
                sseService.send(vehicleDto);
            } catch (Exception e) {
                log.error("Listener exception {} message", topic, e);
            }
        }

        acknowledgment.acknowledge();
    }
}
