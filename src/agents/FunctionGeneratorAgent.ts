import { Agent } from '../core/Agent';
import { GenerationContext, GenerationResult } from '../core/types';
import { TemplateEngine } from '../utils/TemplateEngine';
import { FileWriter } from '../utils/FileWriter';

/**
 * Input for function generation
 */
export interface FunctionInput {
  name: string;
  parameters?: Array<{ name: string; type: string }>;
  returnType?: string;
  isAsync?: boolean;
  body?: string;
}

/**
 * Agent for generating TypeScript functions
 */
export class FunctionGeneratorAgent extends Agent {
  constructor() {
    super({
      name: 'FunctionGenerator',
      description: 'Generates TypeScript function code',
      version: '1.0.0'
    });
  }

  async generate(input: FunctionInput, context?: GenerationContext): Promise<GenerationResult> {
    if (!this.validateInput(input)) {
      return {
        success: false,
        error: 'Invalid input: input must be provided'
      };
    }

    if (!input.name) {
      return {
        success: false,
        error: 'Invalid input: function name is required'
      };
    }

    try {
      const code = this.generateFunctionCode(input);
      
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

  private generateFunctionCode(input: FunctionInput): string {
    const params = input.parameters || [];
    const paramStr = params.map(p => `${p.name}: ${p.type}`).join(', ');
    const returnType = input.returnType || 'void';
    const asyncKeyword = input.isAsync ? 'async ' : '';
    const body = input.body || '// TODO: Implement function body';

    const template = `{{#if isAsync}}async {{/if}}function {{ name }}({{ params }}){{ returnType }} {
  {{ body }}
}`;

    return TemplateEngine.processConditional(template, {
      isAsync: input.isAsync,
      name: input.name,
      params: paramStr,
      returnType: returnType !== 'void' ? `: ${returnType}` : '',
      body: body
    });
  }
}
