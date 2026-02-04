import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Utility for writing generated code to files
 */
export class FileWriter {
  /**
   * Write code to a file
   */
  static async write(filePath: string, content: string): Promise<void> {
    const dir = path.dirname(filePath);
    
    // Create directory if it doesn't exist
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }

    await fs.writeFile(filePath, content, 'utf8');
  }

  /**
   * Read file content
   */
  static async read(filePath: string): Promise<string> {
    return await fs.readFile(filePath, 'utf8');
  }

  /**
   * Check if file exists
   */
  static async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
