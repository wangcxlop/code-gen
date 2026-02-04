# Code-Gen Agents

A flexible and extensible framework for building code generation agents in TypeScript.

## Features

- **Agent-based Architecture**: Modular design with pluggable agents
- **Template Engine**: Simple template system for code generation
- **Type-safe**: Built with TypeScript for type safety
- **Extensible**: Easy to create custom agents
- **File I/O**: Built-in utilities for reading and writing generated code

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Usage

### Basic Example

```typescript
import { AgentRegistry, FunctionGeneratorAgent, ClassGeneratorAgent } from 'code-gen';

// Create registry and register agents
const registry = new AgentRegistry();
const functionAgent = new FunctionGeneratorAgent();
const classAgent = new ClassGeneratorAgent();

registry.register(functionAgent);
registry.register(classAgent);

// Generate a function
const funcResult = await functionAgent.generate({
  name: 'calculateSum',
  parameters: [
    { name: 'a', type: 'number' },
    { name: 'b', type: 'number' }
  ],
  returnType: 'number',
  body: 'return a + b;'
});

console.log(funcResult.code);

// Generate a class
const classResult = await classAgent.generate({
  name: 'User',
  properties: [
    { name: 'id', type: 'string', visibility: 'private' },
    { name: 'name', type: 'string', visibility: 'public' }
  ],
  methods: [
    { name: 'getId', returnType: 'string' }
  ]
});

console.log(classResult.code);
```

### Running Examples

```bash
npm run build
node dist/example.js
```

## Architecture

### Core Components

- **Agent**: Abstract base class for all code generation agents
- **AgentRegistry**: Registry for managing and accessing agents
- **TemplateEngine**: Utility for processing templates with variables
- **FileWriter**: Utility for writing generated code to files

### Available Agents

1. **FunctionGeneratorAgent**: Generates TypeScript functions
2. **ClassGeneratorAgent**: Generates TypeScript classes

## Creating Custom Agents

Extend the `Agent` base class to create your own code generation agents:

```typescript
import { Agent, GenerationContext, GenerationResult } from 'code-gen';

export class MyCustomAgent extends Agent {
  constructor() {
    super({
      name: 'MyCustomAgent',
      description: 'Generates custom code',
      version: '1.0.0'
    });
  }

  async generate(input: any, context?: GenerationContext): Promise<GenerationResult> {
    // Your generation logic here
    const code = `// Generated code`;
    
    return {
      success: true,
      code
    };
  }
}
```

## License

MIT License - see LICENSE file for details
