import { spawn } from "child_process";
export interface CommandResult {
    stdout: string;
    stderr: string;
    exitCode: number;
}

export async function runCommand(
  command: string,
  args: string[],
  onStdout?: (line: string) => void,
  onStderr?: (line: string) => void
): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args);
    
    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(Boolean);
      lines.forEach((line: string) => { //any type breaks line
        stdout += line + '\n';
        if (onStdout) onStdout(line);
      });
    });

    proc.stderr.on('data', (data) => {
      const lines = data.toString().split('\n').filter(Boolean);
      lines.forEach((line: string) => {
        stderr += line + '\n';
        if (onStderr) onStderr(line);
      });
    });

    proc.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code || 0 });
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}