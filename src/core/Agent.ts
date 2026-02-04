import { AgentConfig, GenerationContext, GenerationResult } from './types';

/**
 * Abstract base class for all code generation agents
 */
export abstract class Agent {
  protected config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  /**
   * Get the agent's name
   */
  getName(): string {
    return this.config.name;
  }

  /**
   * Get the agent's description
   */
  getDescription(): string {
    return this.config.description;
  }

  /**
   * Get the agent's version
   */
  getVersion(): string {
    return this.config.version || '1.0.0';
  }

  /**
   * Generate code based on input and context
   */
  abstract generate(input: any, context?: GenerationContext): Promise<GenerationResult>;

  /**
   * Validate input before generation
   */
  protected validateInput(input: any): boolean {
    return input !== null && input !== undefined;
  }
}
