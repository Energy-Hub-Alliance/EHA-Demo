package io.energyhub.demoapi.kafka;

public class SseMessageSendingException extends RuntimeException{

    public SseMessageSendingException(String message) {
        super(message);
    }
}
