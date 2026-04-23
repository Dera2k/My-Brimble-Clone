import pool from "../../db/index"
import { Deployment, DeploymentStatus } from "../../models/deployment.model"

export class DeploymentRepository {
  async create(id: string, repoUrl: string | null): Promise<Deployment> {
    const result = await pool.query(
      `INSERT INTO deployments (id, repo_url, status) 
       VALUES ($1, $2, 'pending') 
       RETURNING *`,
      [id, repoUrl]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Deployment[]> {
    const result = await pool.query(
      'SELECT * FROM deployments ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async findById(id: string): Promise<Deployment | null> {
    const result = await pool.query(
      'SELECT * FROM deployments WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async updateStatus(id: string, status: DeploymentStatus): Promise<void> {
    await pool.query(
      'UPDATE deployments SET status = $1, updated_at = NOW() WHERE id = $2',
      [status, id]
    );
  }

  async updateImageTag(id: string, imageTag: string): Promise<void> {
    await pool.query(
      'UPDATE deployments SET image_tag = $1, updated_at = NOW() WHERE id = $2',
      [imageTag, id]
    );
  }

  async updateContainerInfo(id: string, containerId: string, liveUrl: string): Promise<void> {
    await pool.query(
      `UPDATE deployments 
       SET container_id = $1, live_url = $2, updated_at = NOW() 
       WHERE id = $3`,
      [containerId, liveUrl, id]
    );
  }
}