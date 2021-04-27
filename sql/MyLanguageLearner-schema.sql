Create Table users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    experience INTEGER CHECK (experience >= 0) DEFAULT 0,
    profile_pic text
);

Create Table languages (
    code text PRIMARY KEY,
    name text,
    flag text
);


Create Table user_language (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    language_code text REFERENCES languages ON DELETE CASCADE
);

Create Table units (
    id SERIAL PRIMARY KEY,
    unit_number INTEGER,
    unit_name VARCHAR(20)
);

Create Table subunits (
    id SERIAL PRIMARY KEY,
    number INTEGER,
    unit_number INTEGER REFERENCES units ON DELETE CASCADE
);

Create Table lessons (
    id SERIAL PRIMARY KEY,
    subunit_number INTEGER REFERENCES subunits ON DELETE CASCADE,
    material TEXT NOT NULL
);

Create Table user_lessons (
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    language_code TEXT REFERENCES languages ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons ON DELETE CASCADE
);

Create Table flashcards (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    front_side TEXT NOT NULL,
    back_side TEXT NOT NULL
);