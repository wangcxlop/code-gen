import { AgentRegistry } from './core/AgentRegistry';
import { FunctionGeneratorAgent } from './agents/FunctionGeneratorAgent';
import { ClassGeneratorAgent } from './agents/ClassGeneratorAgent';

/**
 * Example usage of code-gen agents
 */
async function main() {
  // Create registry and register agents
  const registry = new AgentRegistry();
  
  const functionAgent = new FunctionGeneratorAgent();
  const classAgent = new ClassGeneratorAgent();
  
  registry.register(functionAgent);
  registry.register(classAgent);

  console.log('Registered agents:', registry.listNames());

  // Example 1: Generate a function
  console.log('\n=== Generating Function ===');
  const funcResult = await functionAgent.generate({
    name: 'calculateSum',
    parameters: [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' }
    ],
    returnType: 'number',
    body: 'return a + b;'
  });

  if (funcResult.success) {
    console.log('Generated function:\n');
    console.log(funcResult.code);
  }

  // Example 2: Generate a class
  console.log('\n=== Generating Class ===');
  const classResult = await classAgent.generate({
    name: 'User',
    properties: [
      { name: 'id', type: 'string', visibility: 'private' },
      { name: 'name', type: 'string', visibility: 'public' },
      { name: 'email', type: 'string', visibility: 'public' }
    ],
    methods: [
      { name: 'getId', returnType: 'string' },
      { name: 'updateEmail', parameters: ['email: string'], returnType: 'void' }
    ]
  });

  if (classResult.success) {
    console.log('Generated class:\n');
    console.log(classResult.code);
  }
}

// Run example if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main };
