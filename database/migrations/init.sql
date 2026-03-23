-- Initialize Database with Vector Search Support
CREATE EXTENSION IF NOT EXISTS pgvector;

-- User Profiles (WCAG Preferences)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    high_contrast BOOLEAN DEFAULT FALSE,
    reduced_motion BOOLEAN DEFAULT FALSE,
    font_size INTEGER DEFAULT 16,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI-Powered Search Embeddings
CREATE TABLE document_embeddings (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- ADA or Llama vector size
    meta_data JSONB
);

-- Sign Language Overlay Metadata
CREATE TABLE sign_overlays (
    video_id TEXT PRIMARY KEY,
    overlay_data JSONB,
    last_sync TIMESTAMP WITH TIME ZONE
);
