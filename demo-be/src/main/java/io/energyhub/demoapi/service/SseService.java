package io.energyhub.demoapi.service;

import io.energyhub.demoapi.eha.model.VehicleResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseService {

    private final Map<String, List<SseEmitter>> emitterMap = new ConcurrentHashMap<>();

    /**
     * Send the vehicle change DTO to the Emitter for the specific user
     *
     * @param vehicle Vehicle change DTO
     */
    public void send(VehicleResponse vehicle) {

        var emitters = emitterMap.get(vehicle.getUserId());
        if (emitters == null)
            return;
        synchronized (emitters) {
            for (var emitter : emitters) {
                try {
                    log.info("Message sent");
                    emitter.send(vehicle);
                } catch (IOException e) {
                    log.info("Exception: Stop sending to {}", vehicle.getUserId());
                    removeTheEmitter(vehicle.getUserId(), emitter);
                }
            }
        }

    }

    /**
     * Create a new emitter for the user
     *
     * @param userId The user ID
     * @return {@link SseEmitter}
     */
    public SseEmitter createEmitter(String userId) {
        var emitter = new SseEmitter();

        emitter.onCompletion(() -> {
            log.info("Completion: Stop sending to {}", userId);
            removeTheEmitter(userId, emitter);
        });
        emitter.onTimeout(() -> {
            log.info("Timeout: Stop sending to {}", userId);
            emitter.complete();
            removeTheEmitter(userId, emitter);
        });

        emitterMap.computeIfAbsent(userId, k -> Collections.synchronizedList(new ArrayList<>()));
        emitterMap.get(userId).add(emitter);
        log.info("Created emitter for {}", userId);
        return emitter;
    }

    private void removeTheEmitter(String userId, SseEmitter emitter) {
        var emitters = emitterMap.get(userId);
        emitters.remove(emitter);
        if (emitters.isEmpty())
            emitterMap.remove(userId);
    }
}
