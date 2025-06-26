import axios from 'axios';

interface LogEntry {
  stack: string;
  level: 'info' | 'warn' | 'error' | 'debug' | string;
  package: string;
  message: string;
}

export async function Log(
  stack: string,
  level: LogEntry['level'],
  pkg: string,
  message: string
): Promise<void> {
  const logPayload: LogEntry = { stack, level, package: pkg, message };

  try {
    await axios.post('http://20.244.56.144/evaluation-service/logs', logPayload);
  } catch (error) {
    console.error('Logging/API call failed:', error);
    console[level](`[${pkg}] ${message}`);
  }
}
