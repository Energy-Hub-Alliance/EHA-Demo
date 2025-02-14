package io.energyhub.demoapi.eha.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class LogoUrlDto {

    @Schema(description = "The URL to the vendor light logo.", example = "https://energy-hub.io/api/vendors/v1/light/tesla/Tesla.png")
    private String light;

    @Schema(description = "The URL to the vendor dark logo.", example = "https://energy-hub.io/api/vendors/v1/dark/tesla/Tesla.png")
    private String dark;

    public LogoUrlDto(String light, String dark) {
        this.light=light;
        this.dark=dark;
    }
}