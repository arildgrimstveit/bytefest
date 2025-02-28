CREATE TABLE if not exists event (
    id SERIAL PRIMARY KEY,
    byteuser_id integer,
    talk_id integer,
    title varchar(255),
    visability varchar(255),
    description varchar(255),
    start_date integer,
    end_date integer
    );