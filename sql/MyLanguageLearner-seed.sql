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
    (3, 'Numbers'),
    (4, 'Food'),
    (5, 'Shopping'),
    (6, 'Animals'),
    (7, 'Hospital'),
    (8, 'Family and Friends'),
    (9, 'The Town'),
    (10, 'Night Life'),
    (11, 'Politics'),
    (12, 'Religion'),
    (13, 'Abroad'),
    (14, 'Work'),
    (15, 'History'),
    (16, 'The Future');


-- Okay, give each Unit 3-7 subunits, and give each subunit 5-10 pieces of lesson material
INSERT INTO subunits
    (number, unit_number)
VALUES
    (1, 1),(2, 1),(3, 1),(4, 1),(5, 1),
    (6, 2),(7, 2),(8, 2),(9, 2),(10, 2),
    (11, 3),(12, 3),(13, 3),(14, 3),(15, 3),
    (16, 4),(17, 4),(18, 4),(19, 4),(20, 4),
    (21, 5),(22, 5),(23, 5),(24, 5),(25, 5),
    (26, 6),(27, 6),(28, 6),(29, 6),(30, 6);
    -- (31, 7),(32, 7),(33, 7),(34, 7),(35, 7),
    -- (36, 8),(37, 8),(38, 8),(39, 8),(40, 8),
    -- (41, 9),(42, 9),(43, 9),(44, 9),(45, 9),
    -- (46, 10),(47, 10),(48, 10),(49, 10),(51, 10),
    -- (52, 11),(53, 11),(54, 11),(55, 11),(56, 11),
    -- (57, 12),(58, 12),(59, 12),(60, 12),(61, 12),
    -- (62, 13),(63, 13),(64, 13),(65, 13),(66, 13),
    -- (67, 14),(68, 14),(69, 14),(70, 14),(71, 14),
    -- (72, 15),(73, 15),(74, 15),(75, 15),(76, 15),
    -- (77, 16),(78, 16),(79, 16),(80, 16),(81, 16);

INSERT INTO lessons
    (subunit_number, material)
VALUES
    (1, 'Hello'),(1, 'Thank you'),(1, 'You are Welcome'),(1, 'Please'),(1, 'Goodbye'),(1, 'Good evening'),(1, 'Good morning'),(1, 'Good afternoon'),(1, 'Good day'),(1, 'Today'),
    (2, 'Let us go tomorrow'),(2, 'How are you?'),(2, 'What are you doing?'),(2, 'I am doing fine'),(2, 'Good'),(2, 'Bad'),(2, 'I am not feeling well'),(2, 'Tomorrow morning'),(2, 'Grab the paper'),(2, 'Who is this?'),
    (3, 'How is your mom?'), (3, 'She is good'), (3,'Please come again'), (3, 'This evening'), (3, 'This afternoon'), (3, 'bad idea'), (3, 'Good idea'), (3,'He is fast'), (3, 'She is slow'), (3, 'nevermind'),
    (4, 'Telephone'), (4, 'Washing machine'), (4, 'Wash your hands'), (4, 'I am washing my hands'), (4, 'The dog is running'), (4, 'Hello, my friend'), (4, 'Well done!'), (4, 'You could do better'), (4, 'What is that?'), (4, 'No problem!'),
    (5, 'Tree'), (5, 'Flower'), (5, 'Grass'), (5, 'Box'), (5, 'Container'), (5, 'Month'), (5, 'Week'), (5, 'Day'), (5, 'Minute'), (5, 'Second'),
    (6, 'Let us go together, to get her'), (6, 'The boy runs fast'), (6, 'The girls over there are fast'), (6, 'We like ice cream'), (6, 'Would you like some tea'), (6, 'How is your coffee?'), (6, 'No news is good news'), (6,'Why is the lizard smiling?'), (6, 'Cats like drinking milk.'), (6,'Who here wants tea?'),
    (7, 'Hello, Ivan'), (7,'Vera, how are you?'), (7, 'Are you my son?'), (7, 'Who''s cat is that?'), (7, 'I don''t like cats'), (7, 'Is your cat mark?'), (7, 'Tom this is Tim'), (7, 'Tim this is Tom'), (7, 'Ask Tim if he wants coffee'), (7, 'Tom, have some coffee'),
    (8, 'Vera, please come here'), (8, 'I am petting my dog'), (8, 'I like running'), (8, 'I hate walking'), (8, 'Stroll through the park'), (8, 'What a nice park!'), (8, 'This park isn''t very clean'), (8, 'Who do you think I am?'), (8, 'Ivan, it is me'),(8, 'How is your wife, Ivan?'),
    (9, 'This is a table'), (9, 'This is a chair'), (9, 'to eat fish'), (9, 'fishing rod'), (9, 'Let''s go fishing Vera'), (9, 'What nice weather'), (9, 'What''s the weather like tomorrow?'), (9, 'I don''t like this weather'), (9, 'This is strange'), (9, 'Not today please'),
    (10, 'How is the food?'), (10, 'Do you want something to drink?'), (10, 'This is a spoon'),(10, 'Fork'), (10, 'East'), (10, 'North'), (10, 'South'), (10, 'West'), (10, 'Straight'), (10, 'to turn'),
    (11, 'one'),(11, 'two'),(11, 'three'),(11, 'four'),(11, 'five'),(11, 'six'),(11, 'seven'),(11, 'eight'),(11, 'nine'),(11, 'ten'),
    (12, 'eleven'),(12, 'twelve'),(12, 'thirteen'),(12, 'fourteen'),(12, 'fifteen'),(12, 'sixteen'),(12, 'seventeen'),(12, 'eighteen'),(12, 'nineteen'),
    (13, 'twenty'),(13, 'thirty'),(13, 'fourty'),(13, 'fifty'),(13, 'sixty'),(13, 'seventy'),(13, 'eighty'),(13, 'ninety'),(13, 'one hundred'),
    (14, 'thirty one'), (14, 'fifty six'), (14, 'ninety eight'), (14, 'twenty two'), (14, 'forty eight'), (14, 'eighty seven'), (14, 'twenty one'), (14, 'fifty eight'), (14, 'sixty nine'), (14, 'ninety nine'),
    (15, 'one thousand'), (15, 'one hundred thousand'), (15, 'one million'), (15,'one hundred thousand and forty'), (15, 'one thousand six hundred and thirty'), (15, 'six thousand'), (15, 'six hundred thousand'), (15, 'ninety five thousand four hundred'), (15, 'four thousand'), (15, 'five million'),
    (16, 'cheeseburger'),(16, 'I would like some fries'),(16, 'cucumber'),(16, 'Potato'),(16, 'Ketchup'), (16, 'Mustard'),(16, 'Hamburger'),(16, 'Juice'), (16, 'Water'),
    (17, 'Candy'), (17, 'Chocolate'), (17, 'Cake'), (17, 'Cheese'), (17, 'Milk'), (17, 'Taco'), (17, 'Mayonaise'), (17, 'Pickle'), (17, 'Juice'), (17, 'Fish'),
    (18, 'Vanilla'), (18, 'Vinegar'), (18, 'Salt'), (18, 'Flour'), (18, 'Baking Soda'), (18, 'Ginger'), (18, 'Pepper'), (18, 'Pastry'), (18, 'Bread'), (18, 'Broccoli'),
    (19, 'Some more water please'), (19, 'Do you have soda?'), (19, 'Beer'), (19, 'Wine'), (19, 'I''d like some whiskey please'), (19, 'we only have water'), (19, 'I''d like to eat outside please'), (19, 'No, please eat at the table'), (19, 'I''m Hungry!'), (19, 'I am thirsty'),
    (20, 'Chicken with rice'), (20, 'Would you like to see a menu?'), (20, 'How much is your steak'), (20, 'pork'), (20, 'steak'), (20, 'chicken'), (20, 'Duck'), (20, 'Turkey'), (20, 'A small drink please'), (20, 'What size drink would you like?'),
    (21, 'jacket'),(21, 'red coat'),(21, 'Receipt'), (21, 'Price'), (21, 'How much does this cost?'), (21, 'Purse'), (21,'Bag'), (21, 'Discount'), (21, 'Cash'), (21, 'Check'),
    (22, 'Shirt'), (22, 'Pants'), (22, 'Jeans'), (22,'Shoes'), (22,'Necklace'), (22,'Bracelet'), (22,'Is this on sale?'), (22, 'Can I pay less?'), (22, 'Why is this so expensive'), (22, 'Sorry, I don''t have enough money'), (22, 'two for one deal'),
    (23, 'Suit'), (23, 'Store'), (23, 'Department Store'), (23, 'Clearance rack'), (23, 'Cashier'), (23, 'Where is the cashier'), (23, 'Let''s go shopping'), (23, 'Why don''t you want to go shopping'), (23, 'I am buying a skirt'), (23, 'Skirt'),
    (24, 'I don''t want that shirt in blue'), (24, 'Green shoes'), (24,'Red shirt'), (24, 'Black belt'), (24, 'Belt'), (24, 'The cashier is on break'), (24, 'I want to speak to the manager'), (24, 'I am the manager here'),
    (25, 'I want new shoes'), (25, 'Those shoes aren''t new anymore'), (25, 'I smell new shoes'), (25, 'The cashier said these are expensive'), (25, 'This is too big for me'), (25, 'This fits just right'), (25, 'This is too small for me'),
    (26, 'Dog'), (26, 'Cat'), (26, 'Bear'), (26, 'Wolf'), (26, 'Bug'), (26, 'Puppy'), (26, 'Ferret'), (26, 'Shark'), (26, 'Whale'),
    (27, 'There is a wolf'), (27, 'I am scared of bears'), (27, 'Do you like bears?'), (27, 'You are petting the cat'), (27, 'The cat does not like you'), (27, 'The dog likes you very much'),
    (28, 'A bear den'), (28, 'A pack of wolves'), (28, 'I love dogs'), (28, 'I think pigs are cute'), (28, 'Do you have any pets'), (28, 'Pets'),
    (29,'Two flies'), (29, 'There are a lot of flies here'), (29, 'I don''t like bugs'), (29, 'Spider'), (29, 'Why is there a spider here'), (29,'No dogs allowed'), (29, 'Only cats allowed'),
    (30, 'No pets here'), (30, 'Pets are allowed'), (30, 'Beware of dog'), (30, 'Beware of Bears'), (30, 'Never pet a wild animal'), (30, 'Fox'), (30, 'Owl'), (30, 'Bird');
    
    -- (81,'Time Traveling Machine');

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
