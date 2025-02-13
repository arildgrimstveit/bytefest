CREATE TABLE if not exists talk (
    id integer NOT NULL,
    byteuser_id integer NOT NULL,
    FOREIGN KEY (byteuser_id) references byteuser(id),
    title varchar(250),
    description varchar(250),
    date date,
    room varchar(250),
    attendees integer,
    is_public boolean,
    content_type varchar(250) CHECK (content_type IN ('Java', 'Dot_Net', 'React', 'Other')),
    is_external boolean,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (id, byteuser_id)
    );