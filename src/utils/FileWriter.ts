import * as fs from 'fs';
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
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Read file content
   */
  static async read(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Check if file exists
   */
  static exists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
}
