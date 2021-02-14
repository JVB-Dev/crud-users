-- QUERY database
CREATE TABLE dbTeste;

-- QUERYS TABLE usuarios
CREATE TABLE usuarios (
	ID SERIAL,
	EMAIL VARCHAR(80),
	PASSWORD VARCHAR(50),
	NAME VARCHAR(80),
	PRIMARY KEY(ID)
);

INSERT INTO usuarios (EMAIL, PASSWORD, NAME) VALUES ('jv.desenvolve@gmail.com', '123', 'João Vitor');