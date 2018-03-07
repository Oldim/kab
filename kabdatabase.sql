CREATE DATABASE kab;

USE kab;


-- ----------------------TABEL MET 1 USER ------------------------------------------

CREATE TABLE user (
	id int AUTO_INCREMENT PRIMARY KEY,
       surname varchar(20) NOT NULL,
       firstname varchar(20) NOT NULL,
       username varchar(20) NOT NULL,
       wachtwoord varchar(50) NOT NULL
);

SELECT * FROM user;

INSERT INTO user (surname,firstname,username ,wachtwoord) VALUES ('Wout','Philipsen', 'Woutie','wout12580');
INSERT INTO user (surname,firstname,username,wachtwoord) VALUES ('Chloe','Claes', 'Cc', 'chloe12580');
INSERT INTO user (surname,firstname,username,wachtwoord) VALUES ('Dmytri','Oflrenko','Dims', 'dimi12580');

DELETE FROM user
WHERE id > 3;

DROP TABLE user;

-- ----------------------TABEL MET CATEGORY  ------------------------------------------
CREATE TABLE category (
    cat_id int AUTO_INCREMENT,
    description varchar(50) NOT NULL,
    id int,
    PRIMARY KEY (cat_id),
    FOREIGN KEY (id) REFERENCES user (id)
);

DROP TABLE category;

INSERT INTO category (description, id) VALUES ('Sport', '1'); -- wout = 1
INSERT INTO category (description, id) VALUES ('Hobby', '2'); -- chloe = 2
INSERT INTO category (description, id) VALUES ('Werk', '3'); -- Dmytri = 3

SELECT * FROM category;

DELETE FROM category
WHERE cat_id >3;

SELECT * FROM category
WHERE cat_id like 36;

UPDATE category
SET description = 'edit_tile'
WHERE cat_id = 7;

-- --------------------------------- SUB CATEGORY  ------------------------------------------
CREATE TABLE subcat (
    subcat_id int,
    cat_id int,
    PRIMARY KEY (subcat_id),
    FOREIGN KEY (cat_id) REFERENCES category (cat_id),
    FOREIGN KEY (subcat_id) REFERENCES category (cat_id) on delete cascade
);


SELECT * FROM subcat;

SELECT * FROM subcat
WHERE cat_id = 36;

-- create new Cat (dansen)
INSERT INTO category (description, id) VALUES ('Gamen', '2'); -- chloe = 2
INSERT INTO category (description, id) VALUES ('Training', '1');  -- wout = 1

INSERT INTO subcat (subcat_id, cat_id) VALUES ('2', '2'); -- 2 = hobby + chloe = 2
INSERT INTO subcat (subcat_id, cat_id) VALUES ('1', '1'); -- 1 = sport + wout = 1

DROP TABLE subcat;
-- ---------------------------------TABEL MET 1 TAAK-----------------------------------------------


CREATE TABLE task (
    task_id int AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    details varchar(250),
    startdate date,
    enddate date,
    cat_id int,
    PRIMARY KEY (task_id),
    FOREIGN KEY (cat_id) REFERENCES category (cat_id)
);

DROP TABLE task;

-- TAAk IN CATEGORY																-- 2 = hobby + chloe = 2
INSERT INTO task (title,details,startdate, enddate, cat_id) VALUES ('Bakken', 'Taart', '2018-06-02','2018-06-03', '2');
INSERT INTO task (title,details, cat_id) VALUES ('Lopen', '30min', '1');-- 1 = sport + wout = 1

-- TAAK IN SUBCATEGORY 
-- INSERT INTO task (title,details, cat_ID) VALUES ('keeperen', '30min', '1');-- 1 = sport + wout = 1


SELECT * FROM task;

SELECT subcat_id FROM subcat WHERE cat_id = 39; -- OK! 


-- DELETE FROM category WHERE cat_id IN (SELECT subcat_id FROM subcat WHERE cat_id = 39);
DELETE FROM subcat WHERE cat_id = 39;
DELETE FROM category WHERE cat_id = 39;



