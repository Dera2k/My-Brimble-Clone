CREATE TABLE IF NOT EXISTS deployments (
  id VARCHAR(255) PRIMARY KEY,
  repo_url TEXT,
  status VARCHAR(50) NOT NULL,
  image_tag VARCHAR(255),
  container_id VARCHAR(255),
  live_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  deployment_id VARCHAR(255) REFERENCES deployments(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW(),
  line TEXT NOT NULL
);

CREATE INDEX idx_logs_deployment ON logs(deployment_id, timestamp);