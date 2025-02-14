package io.energyhub.demoapi.kafka;

import io.energyhub.demoapi.constant.VendorCapability;
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
import io.energyhub.demoapi.service.SseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.adapter.ConsumerRecordMetadata;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@AllArgsConstructor
@KafkaListener(topics = "#{'${demo-app.topics}'.split(',')}")
public class DeviceEventListener {

    private final SseService sseService;

    @KafkaHandler
    public void forwardVehicleResponseNotification(VehicleResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.VEHICLE_MANAGEMENT, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardVehicleResponseNotification(VehicleCommandResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.VEHICLE_MANAGEMENT, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardTariffResponseNotification(TariffResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.SMART_ENERGY, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardTariffPriceResponseNotification(TariffPriceResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.SMART_ENERGY, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardHvacResponseNotification(HvacResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.HVAC, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardScheduleKafkaResponseNotification(ScheduleKafkaResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.HVAC, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardHvacCommandResponseNotification(HvacCommandResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.HVAC, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardChargerResponseNotification(ChargerResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.CHARGER, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardChargerCommandResponseNotification(ChargerCommandResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.CHARGER, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardBatteryResponseNotification(BatteryResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.HOME_POWER, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardPvInverterResponseNotification(PvInverterResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.HOME_POWER, notification.getUserId(), notification);
    }

    @KafkaHandler
    public void forwardMeterResponseNotification(MeterResponse notification, @Header(KafkaHeaders.RECORD_METADATA) ConsumerRecordMetadata metadata) {
        forwardNotificationToSSEChannel(extractEventTypeFromTopicName(metadata), VendorCapability.HOME_POWER, notification.getUserId(), notification);
    }

    private void forwardNotificationToSSEChannel(String event, VendorCapability vendorCapability, String userId, Object notification) {
        log.debug("Received message {}", notification);
        sseService.send(vendorCapability, userId, event, notification);
    }

    private String extractEventTypeFromTopicName(ConsumerRecordMetadata metadata) {
        String topic = metadata.topic();
        return topic.substring(topic.indexOf('.') + 1);
    }

}
