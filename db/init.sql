CREATE TABLE restaurants (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
address VARCHAR(500) NOT NULL,
latitude DECIMAL(10,8) NOT NULL,
longitude DECIMAL(11,8) NOT NULL,
cuisine_type VARCHAR(50) NOT NULL,
phone_number VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT valid_latitude CHECK (latitude &gt;= -90 AND latitude &lt;= 90),
CONSTRAINT valid_longitude CHECK (longitude &gt;= -180 AND longitude &lt;= 180)
);