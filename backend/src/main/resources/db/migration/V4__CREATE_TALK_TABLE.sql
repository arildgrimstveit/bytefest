CREATE TABLE if not exists talk (
    id SERIAL PRIMARY KEY,
    byteuser_id integer NOT NULL,
    room_id integer,
    event_id integer NOT NULL,
    FOREIGN KEY (byteuser_id) references byteuser(id),
    FOREIGN KEY (room_id) references room(id),
    FOREIGN KEY (event_id) references event(id),
    title varchar(255),
    description varchar(255),
    date date,
    attendees integer,
    content_type varchar(255) CHECK (content_type IN ('Java', 'Dot_Net', 'React', 'Other')),
    created_at timestamp,
    updated_at timestamp
    );