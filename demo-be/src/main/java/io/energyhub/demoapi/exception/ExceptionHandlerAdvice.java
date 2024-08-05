package io.energyhub.demoapi.exception;

import feign.FeignException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class ExceptionHandlerAdvice {

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<String> handleFeignStatusException(FeignException ex, HttpServletRequest request) {
        log.error("Feign exception for {}", request.getRequestURL(), ex);

        HttpStatus httpStatus;
        String responseBody;

        if (ex.status() == -1 || ex.status() == 401) {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            responseBody = """
                    {
                        "id": null,
                        "message": "Internal server error",
                        "errorCode": "INTERNAL_SERVER_ERROR"
                    }
                    """;
        } else {
            httpStatus = HttpStatus.valueOf(ex.status());
            responseBody = ex.contentUTF8();
        }

        return ResponseEntity
                .status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseBody);
    }

}
