/**
 * Utility for managing code templates
 */
export class TemplateEngine {
  /**
   * Process a template string with variables
   */
  static process(template: string, variables: Record<string, any>): string {
    let result = template;
    
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      result = result.replace(regex, String(value));
    }
    
    return result;
  }

  /**
   * Process template with conditional blocks
   */
  static processConditional(template: string, variables: Record<string, any>): string {
    let result = template;
    
    // Process {{#if variable}} ... {{/if}} blocks
    const ifRegex = /{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g;
    result = result.replace(ifRegex, (match, variable, content) => {
      return variables[variable] ? content : '';
    });
    
    // Process {{#unless variable}} ... {{/unless}} blocks
    const unlessRegex = /{{#unless\s+(\w+)}}([\s\S]*?){{\/unless}}/g;
    result = result.replace(unlessRegex, (match, variable, content) => {
      return !variables[variable] ? content : '';
    });
    
    return this.process(result, variables);
  }
}
