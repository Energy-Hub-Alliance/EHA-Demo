package io.energyhub.demoapi.service;

import io.energyhub.demoapi.constant.VendorCapability;
import io.energyhub.demoapi.eha.model.sse.SseMessageDto;
import io.energyhub.demoapi.kafka.SseMessageSendingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseService {

    private final Map<String, List<SseEmitter>> vehicleEmitterMap = new ConcurrentHashMap<>();
    private final Map<String, List<SseEmitter>> smartEnergyEmitterMap = new ConcurrentHashMap<>();
    private final Map<String, List<SseEmitter>> hvacEmitterMap = new ConcurrentHashMap<>();
    private final Map<String, List<SseEmitter>> chargerEmitterMap = new ConcurrentHashMap<>();
    private final Map<String, List<SseEmitter>> homePowerEmitterMap = new ConcurrentHashMap<>();

    private final Map<String, LocalDateTime> lastUpdateTimeMap = new ConcurrentHashMap<>();

    /**
     * Send the vehicle change DTO to the Emitter for the specific user and vendor capability
     *
     * @param vendorCapability Vendor capability that is related to message
     * @param userId           The user ID
     */
    public void send(VendorCapability vendorCapability, String userId, String eventType, Object notification) {
        Map<String, List<SseEmitter>> emitterMap = findEmitterMap(vendorCapability);
        var emitters = emitterMap.get(userId);
        if (emitters == null) {
            if (isRecentlyRemoved(userId)) {
                throw new SseMessageSendingException(String.format("Message not successfully sent for user ID %s and event type %s", userId, eventType));
            }
            return;
        }

        synchronized (emitters) {
            for (var emitter : emitters) {
                try {
                    emitter.send(new SseMessageDto(eventType, notification));
                    log.info("Message sent for user ID {} and event type {}", userId, eventType);
                } catch (IOException e) {
                    log.error("Exception: Stop sending to {}", userId);
                    removeTheEmitter(emitterMap, userId, emitter);
                    throw new SseMessageSendingException(String.format("Message not successfully sent for user ID %s and event type %s", userId, eventType));
                }
            }
        }
    }

    private boolean isRecentlyRemoved(String userId) {
        LocalDateTime timeOfLastRemoval = lastUpdateTimeMap.get(userId);

        if (timeOfLastRemoval != null) {
            if (timeOfLastRemoval.isAfter(LocalDateTime.now().minusSeconds(4))) {
                return true;
            } else {
                lastUpdateTimeMap.remove(userId);
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Create a new emitter for the user and vendor capability
     *
     * @param vendorCapability Vendor capability that is related to created emitter
     * @param userId           The user ID
     * @return {@link SseEmitter}
     */
    public SseEmitter createEmitter(VendorCapability vendorCapability, String userId) {
        Map<String, List<SseEmitter>> emitterMap = findEmitterMap(vendorCapability);
        var emitter = new SseEmitter(45000L);

        emitter.onCompletion(() -> {
            log.info("Completion: Stop sending to {}", userId);
            removeTheEmitter(emitterMap, userId, emitter);
        });
        emitter.onTimeout(() -> {
            log.info("Timeout: Stop sending to {}", userId);
            emitter.complete();
            removeTheEmitter(emitterMap, userId, emitter);
        });

        emitterMap.computeIfAbsent(userId, k -> Collections.synchronizedList(new ArrayList<>()));
        emitterMap.get(userId).add(emitter);
        log.info("Created emitter for {}", userId);
        return emitter;
    }

    private void removeTheEmitter(Map<String, List<SseEmitter>> emitterMap, String userId, SseEmitter emitter) {
        var emitters = emitterMap.get(userId);
        if (emitters != null) {
            emitters.remove(emitter);
            if (emitters.isEmpty()) {
                emitterMap.remove(userId);
                lastUpdateTimeMap.put(userId, LocalDateTime.now());
            }
        }
    }

    private Map<String, List<SseEmitter>> findEmitterMap(VendorCapability vendorCapability) {
        return switch (vendorCapability) {
            case VEHICLE_MANAGEMENT -> vehicleEmitterMap;
            case SMART_ENERGY -> smartEnergyEmitterMap;
            case HVAC -> hvacEmitterMap;
            case CHARGER -> chargerEmitterMap;
            case HOME_POWER -> homePowerEmitterMap;
        };
    }
}
