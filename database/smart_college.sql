CREATE DATABASE IF NOT EXISTS smart_college;
USE smart_college;

CREATE TABLE IF NOT EXISTS users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(100) NOT NULL,
 phone VARCHAR(20),
 email VARCHAR(120) NOT NULL UNIQUE,
 username VARCHAR(50) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,
 course VARCHAR(100),
 year VARCHAR(30),
 role ENUM('admin','student') DEFAULT 'student',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
 id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(100) NOT NULL,
 roll_no VARCHAR(50) NOT NULL UNIQUE,
 course VARCHAR(100) NOT NULL,
 year VARCHAR(30) NOT NULL,
 semester VARCHAR(30) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
 id INT AUTO_INCREMENT PRIMARY KEY,
 student_id INT NOT NULL,
 attendance_date DATE NOT NULL,
 status ENUM('Present','Absent') NOT NULL,
 UNIQUE KEY unique_attendance (student_id, attendance_date),
 FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS courses (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 faculty VARCHAR(150) NOT NULL,
 semester VARCHAR(30) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notices (
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(150) NOT NULL,
 content TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (name,faculty,semester)
SELECT 'B.Sc. AI & ML','Computer Science Department','Semester 4'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE name='B.Sc. AI & ML');

INSERT INTO courses (name,faculty,semester)
SELECT 'B.Sc. Computer Science','Computer Science Department','Semester 4'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE name='B.Sc. Computer Science');

INSERT INTO courses (name,faculty,semester)
SELECT 'BCA','Computer Application Department','Semester 2'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE name='BCA');

INSERT INTO notices (title,content)
SELECT 'Internal Examination','Internal examination schedule will be announced soon.'
WHERE NOT EXISTS (SELECT 1 FROM notices WHERE title='Internal Examination');
