# MyLanguageLearner Backend

# To see running app, go to http://mylanguagelearner.surge.sh

## API - My Memory Api - https://api.mymemory.translated.net

## Server Deployed - https://mylanguagelearner-backend.herokuapp.com

### Uses

#### Language learning, the api is a translator, and the database is seeded with units, subunits, and lessons, that get translated and sent to the front end as material

#### Flashcard and deck functionality allow users to repeat tricky material so that it will stick with them

#### Can learn more than 10 languages (more coming soon...)

#### The server flow works so that a user's requests are authenticated, authorized and sent back with either the requested information or messaging.

#### We use the API to translate words/phrases, this allows for easy language learning. The user can do lessons of our pre made material, while making new flashcards and flashcard decks throughout the process painlessly.

### Installation
To install, and get the app working, just:
* clone the backend repository
* go to the root directory and then type npm install
* run the sql file in the ./sql folder called MyLanguageLearner.sql
* node server.js or nodemon server.js
* Then follow the steps on the readme for our frontend at - https://github.com/ethandeg/MyLanguageLearner-frontend


### tests
To run tests, all you need to do is from the root directory, type jest -i. 
You need Jest downloaded on your computer, and supertest is one of the dev file dependencies




### Stack
* Node.js
* Express
* PostGreSQL
