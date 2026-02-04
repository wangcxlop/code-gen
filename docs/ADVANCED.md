# Advanced Usage Examples

This document provides advanced usage examples for the code-gen agents framework.

## Creating a Custom Agent

Here's an example of creating a custom agent for generating REST API endpoints:

```typescript
import { Agent, GenerationContext, GenerationResult, TemplateEngine } from 'code-gen';

interface APIEndpointInput {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  requestBody?: string;
  responseType?: string;
}

export class APIEndpointAgent extends Agent {
  constructor() {
    super({
      name: 'APIEndpointGenerator',
      description: 'Generates REST API endpoint handlers',
      version: '1.0.0'
    });
  }

  async generate(input: APIEndpointInput, context?: GenerationContext): Promise<GenerationResult> {
    if (!this.validateInput(input)) {
      return { success: false, error: 'Invalid input' };
    }

    const template = `
/**
 * {{ method }} {{ path }}
 */
{{#if requestBody}}
export async function {{ name }}(req: Request<{{ requestBody }}>): Promise<{{ responseType }}> {
{{/if}}
{{#unless requestBody}}
export async function {{ name }}(req: Request): Promise<{{ responseType }}> {
{{/unless}}
  // TODO: Implement endpoint logic
  throw new Error('Not implemented');
}
`;

    const code = TemplateEngine.processConditional(template, {
      name: input.name,
      method: input.method,
      path: input.path,
      requestBody: input.requestBody,
      responseType: input.responseType || 'Response'
    });

    return { success: true, code };
  }
}
```

## Using Multiple Agents Together

```typescript
import { AgentRegistry, FunctionGeneratorAgent, ClassGeneratorAgent } from 'code-gen';
import { FileWriter } from 'code-gen';

async function generateCompleteModule() {
  const registry = new AgentRegistry();
  
  // Register agents
  registry.register(new FunctionGeneratorAgent());
  registry.register(new ClassGeneratorAgent());
  
  // Generate a class
  const classAgent = registry.get('ClassGenerator');
  const classResult = await classAgent.generate({
    name: 'UserService',
    properties: [
      { name: 'users', type: 'User[]', visibility: 'private' }
    ],
    methods: [
      { name: 'findById', parameters: ['id: string'], returnType: 'User | null' },
      { name: 'create', parameters: ['user: User'], returnType: 'User' }
    ]
  });
  
  // Generate helper functions
  const funcAgent = registry.get('FunctionGenerator');
  const funcResult = await funcAgent.generate({
    name: 'validateUser',
    parameters: [
      { name: 'user', type: 'User' }
    ],
    returnType: 'boolean',
    body: 'return user.email && user.name;'
  });
  
  // Combine and write to file
  const fullCode = `${funcResult.code}\n\n${classResult.code}`;
  await FileWriter.write('/tmp/user-service.ts', fullCode);
  
  console.log('Module generated successfully!');
}
```

## Working with Templates

The TemplateEngine supports variable substitution and conditional blocks:

```typescript
import { TemplateEngine } from 'code-gen';

const template = `
interface {{ name }} {
{{#if hasId}}
  id: string;
{{/if}}
  name: string;
{{#if hasEmail}}
  email: string;
{{/if}}
}
`;

const code = TemplateEngine.processConditional(template, {
  name: 'User',
  hasId: true,
  hasEmail: true
});

console.log(code);
```

## Batch Generation

Generate multiple files at once:

```typescript
import { FunctionGeneratorAgent, FileWriter } from 'code-gen';

async function batchGenerate() {
  const agent = new FunctionGeneratorAgent();
  
  const functions = [
    { name: 'add', params: ['a: number', 'b: number'], returnType: 'number' },
    { name: 'subtract', params: ['a: number', 'b: number'], returnType: 'number' },
    { name: 'multiply', params: ['a: number', 'b: number'], returnType: 'number' }
  ];
  
  for (const func of functions) {
    const result = await agent.generate({
      name: func.name,
      parameters: func.params.map(p => {
        const [name, type] = p.split(': ');
        return { name, type };
      }),
      returnType: func.returnType,
      body: '// TODO: Implement'
    });
    
    if (result.success) {
      await FileWriter.write(`/tmp/${func.name}.ts`, result.code);
    }
  }
}
```

## Error Handling

Always handle errors properly:

```typescript
import { FunctionGeneratorAgent } from 'code-gen';

async function safeGenerate() {
  const agent = new FunctionGeneratorAgent();
  
  try {
    const result = await agent.generate({
      name: 'myFunction',
      returnType: 'void'
    });
    
    if (!result.success) {
      console.error('Generation failed:', result.error);
      return;
    }
    
    console.log('Generated code:', result.code);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}
```
