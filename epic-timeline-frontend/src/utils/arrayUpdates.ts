// ✅ ARRAY UPDATE OPERATIONS
export enum ArrayOperation {
  REPLACE = 'REPLACE',      // Replace entire array
  ADD = 'ADD',              // Add items to array
  REMOVE = 'REMOVE',        // Remove items from array
  UPDATE = 'UPDATE',        // Update specific items
  REORDER = 'REORDER',      // Change order of items
  MERGE = 'MERGE'           // Smart merge with deduplication
}

// ✅ ARRAY UPDATE PAYLOAD
export interface ArrayUpdatePayload<T = any> {
  operation: ArrayOperation;
  field: string;
  items?: T[];
  itemsToRemove?: T[] | string[] | number[];
  itemsToAdd?: T[];
  itemsToUpdate?: { index: number; item: T }[];
  newOrder?: number[] | string[];
  mergeKey?: keyof T; // For deduplication in MERGE operations
}

// ✅ BATCH ARRAY UPDATES
export interface BatchArrayUpdate {
  entityType: 'saga' | 'character' | 'song' | 'event' | 'location' | 'comparison';
  entityId: number;
  updates: ArrayUpdatePayload[];
  validateBeforeUpdate?: boolean;
}

// ✅ ARRAY UPDATE UTILITIES
export class ArrayUpdateUtils {
  
  // Replace entire array
  static replace<T>(currentArray: T[], newItems: T[]): T[] {
    return [...newItems];
  }

  // Add items to array (with deduplication)
  static add<T>(currentArray: T[], itemsToAdd: T[], dedupeKey?: keyof T): T[] {
    if (!dedupeKey) {
      return [...currentArray, ...itemsToAdd];
    }

    const existing = new Set(currentArray.map(item => item[dedupeKey]));
    const newItems = itemsToAdd.filter(item => !existing.has(item[dedupeKey]));
    return [...currentArray, ...newItems];
  }

  // Remove items from array
  static remove<T>(currentArray: T[], itemsToRemove: T[] | string[] | number[], compareKey?: keyof T): T[] {
    if (compareKey) {
      const removeSet = new Set(itemsToRemove);
      return currentArray.filter(item => !removeSet.has(item[compareKey] as any));
    }

    // Direct comparison for primitives
    const removeSet = new Set(itemsToRemove);
    return currentArray.filter(item => !removeSet.has(item as any));
  }

  // Update specific items in array
  static update<T>(currentArray: T[], updates: { index: number; item: T }[]): T[] {
    const result = [...currentArray];
    updates.forEach(({ index, item }) => {
      if (index >= 0 && index < result.length) {
        result[index] = item;
      }
    });
    return result;
  }

  // Reorder array items
  static reorder<T>(currentArray: T[], newOrder: number[]): T[] {
    if (newOrder.length !== currentArray.length) {
      throw new Error('New order array must match current array length');
    }
    
    return newOrder.map(index => currentArray[index]);
  }

  // Smart merge with deduplication
  static merge<T>(currentArray: T[], newItems: T[], mergeKey: keyof T): T[] {
    const mergedMap = new Map();
    
    // Add current items
    currentArray.forEach(item => {
      mergedMap.set(item[mergeKey], item);
    });
    
    // Merge/update with new items
    newItems.forEach(item => {
      mergedMap.set(item[mergeKey], item);
    });
    
    return Array.from(mergedMap.values());
  }

  // Apply array update payload
  static applyUpdate<T>(currentArray: T[], payload: ArrayUpdatePayload<T>): T[] {
    switch (payload.operation) {
      case ArrayOperation.REPLACE:
        return payload.items ? this.replace(currentArray, payload.items) : currentArray;
        
      case ArrayOperation.ADD:
        return payload.itemsToAdd 
          ? this.add(currentArray, payload.itemsToAdd, payload.mergeKey)
          : currentArray;
          
      case ArrayOperation.REMOVE:
        return payload.itemsToRemove
          ? this.remove(currentArray, payload.itemsToRemove, payload.mergeKey)
          : currentArray;
          
      case ArrayOperation.UPDATE:
        return payload.itemsToUpdate
          ? this.update(currentArray, payload.itemsToUpdate)
          : currentArray;
          
      case ArrayOperation.REORDER:
        return payload.newOrder
          ? this.reorder(currentArray, payload.newOrder as number[])
          : currentArray;
          
      case ArrayOperation.MERGE:
        return payload.items && payload.mergeKey
          ? this.merge(currentArray, payload.items, payload.mergeKey)
          : currentArray;
          
      default:
        return currentArray;
    }
  }
}

// ✅ EPIC TIMELINE SPECIFIC ARRAY HELPERS
export class EpicArrayHelpers {
  
  // Character appearance in sagas
  static updateCharacterSagas(currentSagas: string[], operation: ArrayOperation, sagas: string[]): string[] {
    return ArrayUpdateUtils.applyUpdate(currentSagas, {
      operation,
      field: 'appearanceInSagas',
      items: sagas,
      itemsToAdd: operation === ArrayOperation.ADD ? sagas : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? sagas : undefined
    });
  }

  // Song themes
  static updateSongThemes(currentThemes: string[], operation: ArrayOperation, themes: string[]): string[] {
    return ArrayUpdateUtils.applyUpdate(currentThemes, {
      operation,
      field: 'themes',
      items: themes,
      itemsToAdd: operation === ArrayOperation.ADD ? themes : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? themes : undefined
    });
  }

  // Character focus in songs
  static updateCharacterFocus(currentFocus: string[], operation: ArrayOperation, characters: string[]): string[] {
    return ArrayUpdateUtils.applyUpdate(currentFocus, {
      operation,
      field: 'characterFocus',
      items: characters,
      itemsToAdd: operation === ArrayOperation.ADD ? characters : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? characters : undefined
    });
  }

  // Comparison similarities/differences
  static updateComparisonPoints(currentPoints: string[], operation: ArrayOperation, points: string[]): string[] {
    return ArrayUpdateUtils.applyUpdate(currentPoints, {
      operation,
      field: 'comparisonPoints',
      items: points,
      itemsToAdd: operation === ArrayOperation.ADD ? points : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? points : undefined
    });
  }
}