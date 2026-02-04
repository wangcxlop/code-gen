import { Agent } from '../core/Agent';
import { GenerationContext, GenerationResult } from '../core/types';
import { TemplateEngine } from '../utils/TemplateEngine';
import { FileWriter } from '../utils/FileWriter';

/**
 * Input for class generation
 */
export interface ClassInput {
  name: string;
  properties?: Array<{ name: string; type: string; visibility?: 'public' | 'private' | 'protected' }>;
  methods?: Array<{ name: string; parameters?: string[]; returnType?: string }>;
  extends?: string;
  implements?: string[];
}

/**
 * Agent for generating TypeScript classes
 */
export class ClassGeneratorAgent extends Agent {
  constructor() {
    super({
      name: 'ClassGenerator',
      description: 'Generates TypeScript class code',
      version: '1.0.0'
    });
  }

  async generate(input: ClassInput, context?: GenerationContext): Promise<GenerationResult> {
    if (!this.validateInput(input)) {
      return {
        success: false,
        error: 'Invalid input: input must be provided'
      };
    }

    if (!input.name) {
      return {
        success: false,
        error: 'Invalid input: class name is required'
      };
    }

    try {
      const code = this.generateClassCode(input);
      
      if (context?.outputPath) {
        await FileWriter.write(context.outputPath, code);
        return {
          success: true,
          code,
          filePath: context.outputPath
        };
      }

      return {
        success: true,
        code
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private generateClassCode(input: ClassInput): string {
    let classDeclaration = `class ${input.name}`;
    
    if (input.extends) {
      classDeclaration += ` extends ${input.extends}`;
    }
    
    if (input.implements && input.implements.length > 0) {
      classDeclaration += ` implements ${input.implements.join(', ')}`;
    }

    let classBody = '';

    // Add properties
    if (input.properties && input.properties.length > 0) {
      input.properties.forEach(prop => {
        const visibility = prop.visibility || 'public';
        classBody += `  ${visibility} ${prop.name}: ${prop.type};\n`;
      });
      classBody += '\n';
    }

    // Add constructor if properties exist
    if (input.properties && input.properties.length > 0) {
      classBody += '  constructor() {\n';
      classBody += '    // TODO: Initialize properties\n';
      classBody += '  }\n\n';
    }

    // Add methods
    if (input.methods && input.methods.length > 0) {
      input.methods.forEach(method => {
        const params = method.parameters?.join(', ') || '';
        const returnType = method.returnType || 'void';
        classBody += `  ${method.name}(${params}): ${returnType} {\n`;
        classBody += '    // TODO: Implement method\n';
        classBody += '  }\n\n';
      });
    }

    return `${classDeclaration} {\n${classBody}}`;
  }
}
