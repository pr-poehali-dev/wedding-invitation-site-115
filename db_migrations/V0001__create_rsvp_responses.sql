CREATE TABLE rsvp_responses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attending TEXT NOT NULL,
  drink TEXT,
  wish TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);