package com.epicstuff.model.enums;

public enum ComparisonType {
    MUSICAL_INSPIRATION("Musical Inspiration"),
    HISTORICAL_EVENT("Historical Event"),
    MYTHOLOGICAL_SOURCE("Mythological Source"),
    LITERARY_REFERENCE("Literary Reference");
    
    private final String displayName;
    
    ComparisonType(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}
