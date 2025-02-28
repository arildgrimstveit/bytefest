CREATE TABLE if not exists room (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    description varchar(255),
    max_attendees integer
    );