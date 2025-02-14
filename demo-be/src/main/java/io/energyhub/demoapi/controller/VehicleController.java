package io.energyhub.demoapi.controller;

import io.energyhub.demoapi.auth.CurrentUser;
import io.energyhub.demoapi.eha.client.EhaVehicleApiClient;
import io.energyhub.demoapi.eha.model.SuccessMessageDto;
import io.energyhub.demoapi.eha.model.VehicleResponse;
import io.energyhub.demoapi.eha.model.pagination.PageResponse;
import io.energyhub.demoapi.eha.model.sort.DeviceForUserSortRequest;
import io.energyhub.demoapi.eha.model.vehicle.CommandType;
import io.energyhub.demoapi.eha.model.vehicle.SubmitCommandResponse;
import io.energyhub.demoapi.eha.model.vehicle.VehicleShortResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "Vehicle Controller")
@RequestMapping("vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final EhaVehicleApiClient ehaVehicleApiClient;
    private final CurrentUser currentUser;

    @Operation(summary = "All vehicles for user", description = "Returns a paginated list of all vehicles for the user.")
    @GetMapping
    public PageResponse<VehicleShortResponse> getAllVehicles(@ParameterObject @Valid DeviceForUserSortRequest request) {
        return ehaVehicleApiClient.getAllVehiclesByUserId(currentUser.getCurrentUser().getUserId(), request);
    }

    @Operation(summary = "Vehicle data for user", description = "Returns single vehicle data by user.")
    @GetMapping("{vehicleId}")
    public VehicleResponse getVehicleById(@Parameter(description = "Vehicle ID") @PathVariable(name = "vehicleId") UUID vehicleUuid) {
        return ehaVehicleApiClient.getVehiclesByUserIdAndVehicleId(currentUser.getCurrentUser().getUserId(), vehicleUuid);
    }

    @Operation(summary = "Refresh vehicle data for user", description = "Update vehicle of user with newest data from vendor system.")
    @GetMapping("{vehicleId}/force-refresh")
    public VehicleResponse forceRefreshVehicleById(@Parameter(description = "Vehicle ID") @PathVariable(name = "vehicleId") UUID vehicleUuid) {
        return ehaVehicleApiClient.refresh(currentUser.getCurrentUser().getUserId(), vehicleUuid);
    }

    @Operation(summary = "Delete vehicle for user", description = "Deletes the vehicle for the user.")
    @DeleteMapping("{vehicleId}")
    public SuccessMessageDto deleteVehicle(@Parameter(description = "Vehicle ID") @PathVariable(name = "vehicleId") UUID vehicleUuid) {
        ehaVehicleApiClient.deleteVehicle(currentUser.getCurrentUser().getUserId(), vehicleUuid);
        return new SuccessMessageDto();
    }

    @Operation(summary = "Get vehicle image for user", description = "Returns the vehicle image as png file for the user.")
    @GetMapping(value = "{vehicleId}/image.png", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] imageForUser(@Parameter(description = "Vehicle ID") @PathVariable(name = "vehicleId") UUID vehicleUuid,
                               HttpServletResponse response) {

        try {
            byte[] image = ehaVehicleApiClient.getVehicleImage(currentUser.getCurrentUser().getUserId(), vehicleUuid);
            response.setContentType(MediaType.IMAGE_PNG_VALUE);
            response.addHeader("Cache-Control", "max-age=600000, must-revalidate, no-transform");
            return image;
        } catch (Exception e) {
            response.addHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            response.addHeader("Expires", "0");
            throw e;
        }
    }

    @Operation(summary = "Submit command for vehicle to start charging",
            description = "This endpoint creates an asynchronously executed command request to start charging.")
    @PostMapping(value = "{vehicleId}/commands/charging-start")
    public SubmitCommandResponse chargingStart(
            @Parameter(description = "Vehicle ID") @PathVariable(name = "vehicleId") UUID vehicleUuid) {
        return ehaVehicleApiClient.chargingStart(currentUser.getCurrentUser().getUserId(), vehicleUuid);
    }

    @Operation(summary = "Submit command for vehicle to stop charging",
            description = "This endpoint creates an asynchronously executed command request to stop charging.")
    @PostMapping(value = "{vehicleId}/commands/charging-stop")
    public SubmitCommandResponse chargingStop(
            @Parameter(description = "Vehicle ID") @PathVariable(name = "vehicleId") UUID vehicleUuid) {
        return ehaVehicleApiClient.chargingStop(currentUser.getCurrentUser().getUserId(), vehicleUuid);
    }

    @Operation(summary = "Vehicle commands", description = "Returns pending commands for vehicle")
    @GetMapping(value = "{vehicleId}/commands")
    public List<SubmitCommandResponse> getPendingVehicleCommands(
            @Parameter(description = "Vehicle ID") @PathVariable(name = "vehicleId") UUID vehicleUuid){
        return ehaVehicleApiClient.getPendingVehicleCommands(currentUser.getCurrentUser().getUserId(), vehicleUuid);
    }
}
