package com.epicstuff.model.enums;

public enum CharacterType {
    MORTAL("Mortal"),
    GOD("God"),
    MONSTER("Monster");

    private final String displayName;

    CharacterType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
    
}
