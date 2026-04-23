import pool from "../../db/index";
import { LogEntry } from "../../models/log.model";

export class LogRepository {
  async create(deploymentId: string, line: string): Promise<LogEntry> {
    const result = await pool.query(
      'INSERT INTO logs (deployment_id, line) VALUES ($1, $2) RETURNING *',
      [deploymentId, line]
    );
    return result.rows[0];
  }


  
  async findByDeploymentId(deploymentId: string): Promise<LogEntry[]> {
    const result = await pool.query(
      'SELECT * FROM logs WHERE deployment_id = $1 ORDER BY timestamp ASC',
      [deploymentId]
    );
    return result.rows;
  }
}