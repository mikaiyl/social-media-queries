CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title varchar(50),
    body varchar(500),
    user_id integer NOT NULL
);
