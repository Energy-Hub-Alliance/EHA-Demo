package io.energyhub.demoapi.eha.model.enums;


import java.util.Arrays;
import java.util.Optional;

public enum Mode {

    AUTO("autonomous"),

    SELF_CONSUMPTION("self_consumption"),
    EXPORT_FOCUS("export_focus"),
    MANUAL("manual");

    private final String value;

    Mode(String value) {
        this.value = value;
    }

    public static Optional<Mode> fromString(String string) {
        return Arrays.stream(Mode.values())
                .filter(item -> item.value.equalsIgnoreCase(string))
                .findFirst();
    }
}