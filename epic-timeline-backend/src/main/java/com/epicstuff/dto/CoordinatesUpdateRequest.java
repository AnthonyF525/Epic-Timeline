package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import javax.validation.constraints.*;

@Data
@Builder
public class CoordinatesUpdateRequest {
    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;
    
    @DecimalMin(value = "-500.0", message = "Altitude must be above -500 meters")
    @DecimalMax(value = "10000.0", message = "Altitude must be below 10000 meters")
    private Double altitude;
    
    @DecimalMin(value = "0.0", message = "Accuracy must be positive")
    @DecimalMax(value = "10000.0", message = "Accuracy cannot exceed 10km")
    private Double accuracy;
}