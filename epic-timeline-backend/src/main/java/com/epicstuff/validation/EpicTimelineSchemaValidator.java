package com.epicstuff.validation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.ValidationMessage;
import com.networknt.schema.ValidationResult;

import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class EpicTimelineSchemaValidator {

    private final ObjectMapper objectMapper;
    private final JsonSchemaFactory schemaFactory;

    public EpicTimelineSchemaValidator() {
        this.objectMapper = new ObjectMapper();
        this.schemaFactory = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V7);
    }
    
    public ValidationResult validateCharacterCreateRequest(Object request) {
        return validateAgainstSchema("schemas/character-create-schema.json", request);
    }

    public ValidationResult validateCharacterUpdateRequest(Object request) {
        return validateAgainstSchema("schemas/character-update-schema.json", request);
    }

    public ValidationResult validateLocationCreateRequest(Object request) {
        return validateAgainstSchema("schemas/location-create-schema.json", request);
    }

    public ValidationResult validateLocationUpdateRequest(Object request) {
        return validateAgainstSchema("schemas/location-update-schema.json", request);
    }

    public ValidationResult validateEventCreateRequest(Object request) {
        return validateAgainstSchema("schemas/event-create-schema.json", request);
    }

    public ValidationResult validateEventUpdateRequest(Object request) {
        return validateAgainstSchema("schemas/event-update-schema.json", request);
    }

    public ValidationResult validateSongCreateRequest(Object request) {
        return validateAgainstSchema("schemas/song-create-schema.json", request);
    }

    public ValidationResult validateSongUpdateRequest(Object request) {
        return validateAgainstSchema("schemas/song-update-schema.json", request);
    }

    public ValidationResult validateComparisonCreateRequest(Object request) {
        return validateAgainstSchema("schemas/comparison-create-schema.json", request);
    }

    public ValidationResult validateComparisonUpdateRequest(Object request) {
        return validateAgainstSchema("schemas/comparison-update-schema.json", request);
    }

    public ValidationResult validateSagaCreateRequest(Object request) {
        return validateAgainstSchema("schemas/saga-create-schema.json", request);
    }

    public ValidationResult validateSagaUpdateRequest(Object request) {
        return validateAgainstSchema("schemas/saga-update-schema.json", request);
    }

    private ValidationResult validateAgainstSchema(String schemaPath, Object request) {
        try {
            // Load schema from resources
            InputStream schemaStream = getClass().getClassLoader().getResourceAsStream(schemaPath);
            if (schemaStream == null) {
                return ValidationResult.failure("Schema not found: " + schemaPath);
            }

            JsonSchema schema = schemaFactory.getSchema(schemaStream);
            
            // Convert request object to JsonNode
            JsonNode requestJson = objectMapper.valueToTree(request);
            
            // Validate
            Set<ValidationMessage> errors = schema.validate(requestJson);
            
            if (errors.isEmpty()) {
                return ValidationResult.success();
            } else {
                List<String> errorMessages = errors.stream()
                    .map(ValidationMessage::getMessage)
                    .collect(Collectors.toList());
                return ValidationResult.failure(errorMessages);
            }
            
        } catch (Exception e) {
            return ValidationResult.failure("Validation error: " + e.getMessage());
        }
    }

    public ValidationResult validateEpicTimelineBusinessRules(String entityType, Object request) {
        switch (entityType.toLowerCase()) {
            case "character":
                return validateCharacterBusinessRules(request);
            case "location":
                return validateLocationBusinessRules(request);
            case "event":
                return validateEventBusinessRules(request);
            case "comparison":
                return validateComparisonBusinessRules(request);
            default:
                return ValidationResult.success();
        }
    }

    private ValidationResult validateCharacterBusinessRules(Object request) {
        // ✅ Epic Timeline specific character validation
        try {
            JsonNode requestJson = objectMapper.valueToTree(request);
            
            // Gods should typically be immortal
            if (hasValue(requestJson, "characterType", "GOD") && 
                hasValue(requestJson, "isImmortal", false)) {
                return ValidationResult.warning("Gods are typically immortal in Epic Timeline mythology");
            }
            
            // Cannot be both protagonist and antagonist
            if (hasValue(requestJson, "isProtagonist", true) && 
                hasValue(requestJson, "isAntagonist", true)) {
                return ValidationResult.failure("Character cannot be both protagonist and antagonist");
            }
            
            // Title characters should have spoken lines
            if (hasValue(requestJson, "isTitleCharacter", true) && 
                hasValue(requestJson, "hasSpokenLines", false)) {
                return ValidationResult.warning("Title characters typically have spoken lines");
            }
            
            return ValidationResult.success();
        } catch (Exception e) {
            return ValidationResult.failure("Business rule validation error: " + e.getMessage());
        }
    }

    private ValidationResult validateLocationBusinessRules(Object request) {
        try {
            JsonNode requestJson = objectMapper.valueToTree(request);
            
            // Real places cannot be mythological
            if (hasValue(requestJson, "isRealPlace", true) && 
                hasValue(requestJson, "isMythological", true)) {
                return ValidationResult.failure("Location cannot be both real and mythological");
            }
            
            // Underwater locations are rarely tourist destinations
            if (hasValue(requestJson, "isUnderwater", true) && 
                hasValue(requestJson, "isTouristDestination", true)) {
                return ValidationResult.warning("Underwater locations are rarely tourist destinations");
            }
            
            return ValidationResult.success();
        } catch (Exception e) {
            return ValidationResult.failure("Business rule validation error: " + e.getMessage());
        }
    }

    private ValidationResult validateEventBusinessRules(Object request) {
        // Epic Timeline event validation rules
        return ValidationResult.success();
    }

    private ValidationResult validateComparisonBusinessRules(Object request) {
        try {
            JsonNode requestJson = objectMapper.valueToTree(request);
            
            // Entity IDs should be different
            if (hasField(requestJson, "entityOneId") && hasField(requestJson, "entityTwoId")) {
                Long entityOneId = requestJson.get("entityOneId").asLong();
                Long entityTwoId = requestJson.get("entityTwoId").asLong();
                
                if (entityOneId.equals(entityTwoId)) {
                    return ValidationResult.failure("Cannot compare an entity with itself");
                }
            }
            
            return ValidationResult.success();
        } catch (Exception e) {
            return ValidationResult.failure("Business rule validation error: " + e.getMessage());
        }
    }

    private boolean hasValue(JsonNode node, String fieldName, Object expectedValue) {
        if (!node.has(fieldName)) return false;
        JsonNode fieldNode = node.get(fieldName);
        
        if (expectedValue instanceof Boolean) {
            return fieldNode.isBoolean() && fieldNode.booleanValue() == (Boolean) expectedValue;
        } else if (expectedValue instanceof String) {
            return fieldNode.isTextual() && fieldNode.textValue().equals(expectedValue);
        }
        
        return false;
    }

    private boolean hasField(JsonNode node, String fieldName) {
        return node.has(fieldName) && !node.get(fieldName).isNull();
    }

}
