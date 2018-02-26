CREATE DATABASE kab;

USE kab;

-- ---------------------TABEL MET ALLE USERS----------------------------------------
CREATE TABLE users (
	ID int AUTO_INCREMENT PRIMARY KEY,
       username varchar(20) NOT NULL
);

-- ----------------------TABEL MET 1 USER ------------------------------------------

CREATE TABLE user (
	ID int AUTO_INCREMENT PRIMARY KEY,
       surname varchar(20) NOT NULL,
       firstname varchar(20) NOT NULL,
       username varchar(20) NOT NULL,
       user_password varchar(50) NOT NULL
);

SELECT * FROM user;

INSERT INTO user (surname,firstname,username ,user_password) VALUES ('Wout','Philipsen', 'Woutie','wout12580');
INSERT INTO user (surname,firstname,username,user_password) VALUES ('Chloe','Claes', 'Cc', 'chloe12580');
INSERT INTO user (surname,firstname,username,user_password) VALUES ('Dmytri','Oflrenko','Dims', 'dimi12580');

DELETE FROM user
WHERE ID > 3;

DROP TABLE user;


-- ----------------------TABEL MET CATEGORY  ------------------------------------------
CREATE TABLE category (
    cat_ID int AUTO_INCREMENT,
    description varchar(50) NOT NULL,
    ID int,
    PRIMARY KEY (cat_ID),
    FOREIGN KEY (ID) REFERENCES user (ID)
);

DROP TABLE category;

INSERT INTO category (description, ID) VALUES ('Sport', '1'); -- wout = 1
INSERT INTO category (description, ID) VALUES ('Hobby', '2'); -- chloe = 2
INSERT INTO category (description, ID) VALUES ('Werk', '3'); -- Dmytri = 3

SELECT * FROM category;

SELECT u.username 
FROM category c, user u 
WHERE c.ID like '2';


-- --------------------------------- SUB CATEGORY  ------------------------------------------
CREATE TABLE subcat (
    subcat_ID int,
    cat_ID int,
    PRIMARY KEY (subcat_ID),
    FOREIGN KEY (cat_ID) REFERENCES category (cat_ID),
    FOREIGN KEY (subcat_ID) REFERENCES category (cat_ID)
);

DROP TABLE subcat;

-- create new Cat (dansen)
INSERT INTO category (description, ID) VALUES ('Gamen', '2'); -- chloe = 2
INSERT INTO category (description, ID) VALUES ('Training', '1');  -- wout = 1

INSERT INTO subcat (subcat_ID, cat_ID) VALUES ('2', '2'); -- 2 = hobby + chloe = 2
INSERT INTO subcat (subcat_ID, cat_ID) VALUES ('1', '1'); -- 1 = sport + wout = 1

SELECT * FROM subcat;

-- ---------------------------------TABEL MET 1 TAAK-----------------------------------------------


CREATE TABLE task (
    task_ID int AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    details varchar(250),
    startdate date,
    enddate date,
    cat_ID int,
    PRIMARY KEY (task_ID),
    FOREIGN KEY (cat_ID) REFERENCES category (cat_ID)
);

DROP TABLE task;

-- TAAk IN CATEGORY																-- 2 = hobby + chloe = 2
INSERT INTO task (title,details,startdate, enddate, cat_ID) VALUES ('Bakken', 'Taart', '2018-06-02','2018-06-03', '2');
INSERT INTO task (title,details, cat_ID) VALUES ('Lopen', '30min', '1');-- 1 = sport + wout = 1

-- TAAK IN SUBCATEGORY 
-- INSERT INTO task (title,details, cat_ID) VALUES ('keeperen', '30min', '1');-- 1 = sport + wout = 1


SELECT * FROM task;





