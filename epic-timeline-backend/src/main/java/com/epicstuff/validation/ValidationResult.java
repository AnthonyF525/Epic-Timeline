package com.epicstuff.validation;

import lombok.Data;
import lombok.Builder;
import java.util.List;
import java.util.ArrayList;

@Data
@Builder
public class ValidationResult {
    private boolean valid;
    private List<String> errors;
    private List<String> warnings;
    private String message;

    public static ValidationResult success() {
        return ValidationResult.builder()
            .valid(true)
            .errors(new ArrayList<>())
            .warnings(new ArrayList<>())
            .message("Validation passed")
            .build();
    }

    public static ValidationResult failure(String error) {
        List<String> errors = new ArrayList<>();
        errors.add(error);
        return ValidationResult.builder()
            .valid(false)
            .errors(errors)
            .warnings(new ArrayList<>())
            .message("Validation failed")
            .build();
    }

    public static ValidationResult failure(List<String> errors) {
        return ValidationResult.builder()
            .valid(false)
            .errors(errors)
            .warnings(new ArrayList<>())
            .message("Validation failed")
            .build();
    }

    public static ValidationResult warning(String warning) {
        List<String> warnings = new ArrayList<>();
        warnings.add(warning);
        return ValidationResult.builder()
            .valid(true)
            .errors(new ArrayList<>())
            .warnings(warnings)
            .message("Validation passed with warnings")
            .build();
    }

    public boolean hasErrors() {
        return errors != null && !errors.isEmpty();
    }

    public boolean hasWarnings() {
        return warnings != null && !warnings.isEmpty();
    }
}
