export interface ComponentScoringDimensions {
  aesthetic_alignment: number; // 0-100
  accessibility_score: number;
  performance_impact: number;
  customizability: number;
  documentation_quality: number;
  market_popularity: number;
  maintenance_frequency: number;
  dependency_weight: number;
}

/**
 * Priority 15: Smart Market-Aware UI Component Intelligence (§32)
 * §32 Component Trend Scorer: 8-dimension scoring engine.
 * Calculates how suitable a component is for a current Ardeno OS project.
 */
export class ComponentTrendScorer {
  
  /**
   * Calculates a normalized 0-100 score based on 8 key dimensions.
   */
  public calculateScore(dimensions: ComponentScoringDimensions): number {
    const weights = {
      aesthetic: 0.20,
      accessibility: 0.15,
      performance: 0.15,
      customizability: 0.10,
      documentation: 0.10,
      popularity: 0.10,
      maintenance: 0.10,
      dependency: 0.10
    };

    const finalScore = 
      (dimensions.aesthetic_alignment * weights.aesthetic) +
      (dimensions.accessibility_score * weights.accessibility) +
      (dimensions.performance_impact * weights.performance) +
      (dimensions.customizability * weights.customizability) +
      (dimensions.documentation_quality * weights.documentation) +
      (dimensions.market_popularity * weights.popularity) +
      (dimensions.maintenance_frequency * weights.maintenance) +
      (dimensions.dependency_weight * weights.dependency);

    return Math.min(100, Math.max(0, finalScore));
  }

  /**
   * Generates a structural score based on repository URL and name.
   */
  public async scoreComponent(name: string, url: string): Promise<{ total_score: number, metrics: ComponentScoringDimensions }> {
    // In a real implementation this would fetch GitHub stars/issues and compute a proper heuristic.
    // For now, we simulate dimensions intelligently using random distribution around 70-98.
    const base = () => 65 + Math.random() * 35;
    
    let metrics: ComponentScoringDimensions = {
      aesthetic_alignment: base(),
      accessibility_score: base(),
      performance_impact: base(),
      customizability: base(),
      documentation_quality: base(),
      market_popularity: base(),
      maintenance_frequency: base(),
      dependency_weight: base()
    };
    
    // Slight boost for named trendy components (e.g., shadcn always scores higher on aesthetic)
    if (url.includes('shadcn')) metrics.aesthetic_alignment = Math.max(metrics.aesthetic_alignment, 90);
    if (name.includes('Grid')) metrics.performance_impact = Math.max(metrics.performance_impact, 85);
    
    return {
      total_score: this.calculateScore(metrics),
      metrics
    };
  }
}
