CREATE DATABASE turnosreserva;

USE turnosreserva;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE patients (
   id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL

);

ALTER TABLE patients
  ADD PRIMARY KEY (id);

ALTER TABLE patients
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE patients;

INSERT INTO users (id, surname, name, password, email, dni, fullname) 
  VALUES (1, 'Hess', 'Jorge', 'jhessle04@gmail.com', '31146167', '123456', 'Jorge Hess');

SELECT * FROM users;

--  TABLE clínico
CREATE TABLE cardiologia (
  id INT(11) NOT NULL,
  especialidad VARCHAR(150) NOT NULL,
  medico VARCHAR(255) NOT NULL,
  horario VARCHAR(150) NOT NULL
);

ALTER TABLE cardiologia
  ADD PRIMARY KEY (id);

ALTER TABLE cardiologia
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE clinicos;




--  TABLE turnos

CREATE TABLE turnos (
  id INT(11) NOT NULL,
  especialidad VARCHAR(150) NOT NULL,
  medico VARCHAR(255) NOT NULL,
  horario VARCHAR(150) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES patients(id)
);

ALTER TABLE turnos
  ADD PRIMARY KEY (id);

ALTER TABLE turnos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE turnos;

