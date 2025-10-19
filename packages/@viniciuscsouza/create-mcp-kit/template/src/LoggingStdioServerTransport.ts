import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as fs from 'fs';
import * as path from 'path';

export class LoggingStdioServerTransport extends StdioServerTransport {
  private logStream: fs.WriteStream;

  constructor() {
    super();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFileName = `mcp-exchange-${timestamp}.log`;
    const logFilePath = path.join(process.cwd(), 'logs', logFileName);
    this.logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    const originalOnMessage = this.onmessage;
    this.onmessage = (message: any) => {
      this.logStream.write(`[CLIENT -> SERVER]: ${JSON.stringify(message, null, 2)}
`);
      if (originalOnMessage) {
        originalOnMessage(message);
      }
    };
  }

  public override async send(message: any): Promise<void> {
    this.logStream.write(`[SERVER -> CLIENT]: ${JSON.stringify(message, null, 2)}
`);
    await super.send(message);
  }
}
