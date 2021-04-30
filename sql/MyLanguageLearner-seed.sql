INSERT INTO users
    (username, password, experience)
VALUES
    ('testuser', 'testpassword', 100),
    ('cooluser', 'ilikecats123', 0),
    ('russianlearner', 'Ilikerussian', 2000);

INSERT INTO languages
    (code, name, flag)
VALUES
    ('ja', 'Japanese', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png'),
    ('ru', 'Russian', 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png'),
    ('es', 'Spanish', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png'),
    ('it', 'Italian', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Italy_%28Pantone%2C_2003%E2%80%932006%29.svg/220px-Flag_of_Italy_%28Pantone%2C_2003%E2%80%932006%29.svg.png'),
    ('de', 'German', 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg'),
    ('fr', 'French', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png');

INSERT INTO user_language
    (username, language_code)
VALUES
    ('russianlearner', 'ru'),
    ('testuser', 'it'),
    ('testuser', 'es'),
    ('cooluser', 'ja');

INSERT INTO units
    (unit_number, unit_name)
VALUES
    (1, 'Basic'),
    (2, 'Phrases'),
    (3, 'Food'),
    (4, 'Shopping');

INSERT INTO subunits
    (number, unit_number)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (1, 2),
    (2, 2),
    (2, 3),
    (3, 3),
    (1, 4),
    (2, 4);

INSERT INTO lessons
    (subunit_number, material)
VALUES
    (1, 'Hello'),
    (1, 'Thank you'),
    (1, 'You are Welcome'),
    (2, 'Let us go tomorrow'),
    (2, 'How are you?'),
    (3, 'cheeseburger'),
    (3, 'I would like some fries'),
    (4, 'jacket'),
    (4, 'red coat');

INSERT INTO user_lessons
    (username, language_code, lesson_id)
VALUES
    ('testuser', 'it', 1),
    ('testuser', 'it', 2),
    ('testuser', 'it', 3),
    ('russianlearner', 'ru', 1),
    ('russianlearner', 'ru', 2),
    ('russianlearner', 'ru', 3),
    ('russianlearner', 'ru', 4),
    ('russianlearner', 'ru', 5),
    ('testuser', 'es', 3),
    ('testuser', 'es', 4),
    ('testuser', 'es', 7),
    ('cooluser', 'ja', 4),
    ('cooluser', 'ja', 1),
    ('cooluser', 'ja', 6);

INSERT INTO decks
    (username, name)
VALUES
    ('testuser', 'unit 1'),
    ('russianlearner', 'russian flash cards'),
    ('cooluser', 'japanese deck');

INSERT INTO flashcards
    (deck_id, front_side, back_side)
VALUES
    (1, 'something English', 'something italian'),
    (1, 'something english', 'something spanish'),
    (2, 'something english', 'something russian'),
    (3, 'something english', 'something japanese'),
    (3, 'something english', 'something japanese again');
