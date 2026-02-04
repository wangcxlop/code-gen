/**
 * Configuration for a code generation agent
 */
export interface AgentConfig {
  name: string;
  description: string;
  version?: string;
}

/**
 * Context for code generation
 */
export interface GenerationContext {
  outputPath?: string;
  metadata?: Record<string, any>;
}

/**
 * Result of code generation
 */
export interface GenerationResult {
  success: boolean;
  code?: string;
  filePath?: string;
  error?: string;
}
