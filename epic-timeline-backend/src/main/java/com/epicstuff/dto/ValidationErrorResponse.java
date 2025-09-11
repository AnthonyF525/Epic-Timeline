package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import java.util.List;



@Data
@Builder
public class ValidationErrorResponse {
    private String status;
    private String message;
    private List<String> error;
    private List<String> warnings;
    private Long timestamp;
    
}
