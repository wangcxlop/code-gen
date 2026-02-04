import { Agent } from './Agent';

/**
 * Registry for managing code generation agents
 */
export class AgentRegistry {
  private agents: Map<string, Agent>;

  constructor() {
    this.agents = new Map();
  }

  /**
   * Register an agent
   */
  register(agent: Agent): void {
    this.agents.set(agent.getName(), agent);
  }

  /**
   * Unregister an agent
   */
  unregister(name: string): boolean {
    return this.agents.delete(name);
  }

  /**
   * Get an agent by name
   */
  get(name: string): Agent | undefined {
    return this.agents.get(name);
  }

  /**
   * Get all registered agents
   */
  getAll(): Agent[] {
    return Array.from(this.agents.values());
  }

  /**
   * List all agent names
   */
  listNames(): string[] {
    return Array.from(this.agents.keys());
  }

  /**
   * Check if an agent is registered
   */
  has(name: string): boolean {
    return this.agents.has(name);
  }

  /**
   * Clear all agents
   */
  clear(): void {
    this.agents.clear();
  }
}
