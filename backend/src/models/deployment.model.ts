export type DeploymentStatus = 
| 'pending'
| 'building'
| 'deploying'
| 'running'
| 'failed'

export interface Deployment {
    id: string;
    repo_url : string | null;
    status: DeploymentStatus;
    image_tag: string | null;
    container_id: string | null;
    live_url: string | null;
    created_at: Date;
    updated_at: Date;
}


export interface CreateDeploymentDTO {
    type: 'git' | 'upload';
    repoUrl?: string;
    projectName?: string;
}