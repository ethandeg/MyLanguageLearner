

DROP DATABASE IF EXISTS "MyLanguageLearner";
CREATE DATABASE "MyLanguageLearner";
\c "MyLanguageLearner";

\i MyLanguageLearner-schema.sql
\i MyLanguageLearner-seed.sql
