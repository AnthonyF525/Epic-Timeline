import { epicRequest } from './apiClient';
import { Comparison } from '../types';
import { ArrayOperation, ArrayUpdatePayload, BatchArrayUpdate, EpicArrayHelpers } from '../utils/arrayUpdates';

export class ComparisonService {
  
  // ✓ BASIC COMPARISON OPERATIONS
  static async getAllComparisons(): Promise<Comparison[]> {
    const response = await epicRequest.get<Comparison[]>('/comparisons');
    return response.data;
  }

  static async getComparisonById(id: number): Promise<Comparison> {
    const response = await epicRequest.get<Comparison>(`/comparisons/${id}`);
    return response.data;
  }

  // ✓ SIMILARITIES UPDATES
  static async updateComparisonSimilarities(comparisonId: number, operation: ArrayOperation, similarities: string[]): Promise<Comparison> {
    const updatedSimilarities = EpicArrayHelpers.updateComparisonPoints([], operation, similarities);
    
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'similarities',
      items: operation === ArrayOperation.REPLACE ? similarities : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? similarities : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? similarities : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/similarities`, payload);
    return response.data;
  }

  // ✓ DIFFERENCES UPDATES
  static async updateComparisonDifferences(comparisonId: number, operation: ArrayOperation, differences: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'differences',
      items: operation === ArrayOperation.REPLACE ? differences : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? differences : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? differences : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/differences`, payload);
    return response.data;
  }

  // ✓ ORIGINAL ELEMENTS UPDATES
  static async updateComparisonOriginalElements(comparisonId: number, operation: ArrayOperation, elements: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'originalElements',
      items: operation === ArrayOperation.REPLACE ? elements : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? elements : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? elements : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/original-elements`, payload);
    return response.data;
  }

  // ✓ ADAPTATION CHOICES UPDATES
  static async updateComparisonAdaptationChoices(comparisonId: number, operation: ArrayOperation, choices: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'adaptationChoices',
      items: operation === ArrayOperation.REPLACE ? choices : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? choices : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? choices : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/adaptation-choices`, payload);
    return response.data;
  }

  // ✓ ACADEMIC SOURCES UPDATES
  static async updateComparisonAcademicSources(comparisonId: number, operation: ArrayOperation, sources: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'scholarlyInfo.academicSources',
      items: operation === ArrayOperation.REPLACE ? sources : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? sources : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? sources : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/academic-sources`, payload);
    return response.data;
  }

  // ✓ LEARNING OBJECTIVES UPDATES
  static async updateComparisonLearningObjectives(comparisonId: number, operation: ArrayOperation, objectives: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'educationalAspects.learningObjectives',
      items: operation === ArrayOperation.REPLACE ? objectives : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? objectives : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? objectives : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/learning-objectives`, payload);
    return response.data;
  }

  // ✓ DISCUSSION QUESTIONS UPDATES
  static async updateComparisonDiscussionQuestions(comparisonId: number, operation: ArrayOperation, questions: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'educationalAspects.discussionQuestions',
      items: operation === ArrayOperation.REPLACE ? questions : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? questions : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? questions : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/discussion-questions`, payload);
    return response.data;
  }

  // ✓ TAGS UPDATES
  static async updateComparisonTags(comparisonId: number, operation: ArrayOperation, tags: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'tags',
      items: operation === ArrayOperation.REPLACE ? tags : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? tags : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? tags : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/tags`, payload);
    return response.data;
  }

  // ✓ KEYWORDS UPDATES
  static async updateComparisonKeywords(comparisonId: number, operation: ArrayOperation, keywords: string[]): Promise<Comparison> {
    const payload: ArrayUpdatePayload<string> = {
      operation,
      field: 'keywords',
      items: operation === ArrayOperation.REPLACE ? keywords : undefined,
      itemsToAdd: operation === ArrayOperation.ADD ? keywords : undefined,
      itemsToRemove: operation === ArrayOperation.REMOVE ? keywords : undefined
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/keywords`, payload);
    return response.data;
  }

  // ✓ BATCH ARRAY UPDATES
  static async batchUpdateComparisonArrays(comparisonId: number, updates: ArrayUpdatePayload[]): Promise<Comparison> {
    const batchPayload: BatchArrayUpdate = {
      entityType: 'comparison',
      entityId: comparisonId,
      updates,
      validateBeforeUpdate: true
    };

    const response = await epicRequest.patch(`/comparisons/${comparisonId}/batch-arrays`, batchPayload);
    return response.data;
  }

  // ✓ EPIC TIMELINE HELPERS
  static async addSimilarityToHomerComparisons(similarity: string): Promise<Comparison[]> {
    const homerComparisons = await this.getHomerComparisons();
    const updatedComparisons: Comparison[] = [];
    
    for (const comparison of homerComparisons) {
      const updated = await this.updateComparisonSimilarities(comparison.id, ArrayOperation.ADD, [similarity]);
      updatedComparisons.push(updated);
    }
    
    return updatedComparisons;
  }

  static async getHomerComparisons(): Promise<Comparison[]> {
    const response = await epicRequest.get<Comparison[]>('/comparisons/homer');
    return response.data;
  }
}