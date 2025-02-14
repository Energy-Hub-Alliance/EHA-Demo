package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.constant.VendorCapability;
import io.energyhub.demoapi.service.SseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@RequestMapping("sse")
@Tag(name = "Sse Controller")
@RestController
public class SseController {

    private final SseService sseService;
    private final CurrentUser currentUser;

    @Operation(summary = "Create SSE listener for vehicle management events", description = """
            Create SSE listener for vehicle management events related to logged in user.
            Available notifications:
            - When vehicle is linked **(vehicle.connect)**
            - When vehicle is updated **(vehicle.update)**
            - When vehicle is deleted **(vehicle.delete)**
            - Vehicle command info **(vehicle.command)**
            """)
    @GetMapping(value = "vehicles", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getVehiclesSseStream() {
        return sseService.createEmitter(VendorCapability.VEHICLE_MANAGEMENT, currentUser.getCurrentUser().getUserId());
    }

    @Operation(summary = "Create SSE listener for smart energy events", description = """
            Create SSE listener for smart energy events related to logged in user.
            Available notifications:
            - When tariff is linked **(tariff.connect)**
            - When tariff is deleted **(tariff.delete)**
            - When new prices are available **(tariff.price.update)**
            """)
    @GetMapping(value = "tariffs", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getTariffsSseStream() {
        return sseService.createEmitter(VendorCapability.SMART_ENERGY, currentUser.getCurrentUser().getUserId());
    }

    @Operation(summary = "Create SSE listener for HVAC events", description = """
            Create SSE listener for HVAC events related to logged in user.
            Available notifications:
            - When HVAC is linked **(hvac.connect)**
            - When HVAC is updated **(hvac.update)**
            - When HVAC is deleted **(hvac.delete)**
            - When HVAC schedules are updated **(hvac.schedules.update)**
            - HVAC command info **(hvac.command)**
            """)
    @GetMapping(value = "hvacs", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getHvacsSseStream() {
        return sseService.createEmitter(VendorCapability.HVAC, currentUser.getCurrentUser().getUserId());
    }

    @Operation(summary = "Create SSE listener for charger events", description = """
            Create SSE listener for charger events related to logged in user.
            Available notifications:
            - When charger is linked **(charger.connect)**
            - When charger is updated **(charger.update)**
            - When charger is deleted **(charger.delete)**
            - Charger command info **(charger.command)**
            """)
    @GetMapping(value = "chargers", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getChargersSseStream() {
        return sseService.createEmitter(VendorCapability.CHARGER, currentUser.getCurrentUser().getUserId());
    }

    @Operation(summary = "Create SSE listener for home power events", description = """
            Create SSE listener for home power events related to logged in user. This includes batteries, pv-inverters and meters.
            Available notifications:
            - When battery is linked **(battery.connect)**
            - When battery is updated **(battery.update)**
            - When battery is deleted **(battery.delete)**
            - When pv-inverter is linked **(pv-inverter.connect)**
            - When pv-inverter is updated **(pv-inverter.update)**
            - When pv-inverter is deleted **(pv-inverter.delete)**
            - When meter is linked **(meter.connect)**
            - When meter is updated **(meter.update)**
            - When meter is deleted **(meter.delete)**
            """)
    @GetMapping(value = "home-power", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getHomePowerSseStream() {
        return sseService.createEmitter(VendorCapability.HOME_POWER, currentUser.getCurrentUser().getUserId());
    }
}
