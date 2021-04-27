INSERT INTO users 
(username, password, experience) 
VALUES
 ('testuser', 'testpassword', 100),
 ('cooluser', 'ilikecats123', 0),
 ('russianlearner','Ilikerussian', 2000);

 INSERT INTO languages
 (code, name)
 VALUES
 ('ja', 'Japanese'),
 ('ru', 'Russian'),
 ('es', 'Spanish'),
 ('it', 'Italian');

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
 (2,1),
 (3,1),
 (1,2),
 (2,2),
 (2,3),
 (3,3),
 (1,4),
 (2,4);

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
 (4,'red coat');

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


 INSERT INTO flashcards
 (username, front_side, back_side)
VALUES
('testuser', 'something English', 'something italian'),
('testuser', 'something english', 'something spanish'),
('russianlearner', 'something english', 'something russian'),
('cooluser', 'something english', 'something japanese'),
('cooluser', 'something english', 'something japanese again');
