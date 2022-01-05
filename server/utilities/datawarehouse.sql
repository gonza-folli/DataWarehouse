CREATE DATABASE datawarehouse;

USE datawarehouse;

CREATE TABLE countries(
    id_country INT NOT NULL AUTO_INCREMENT,
	country VARCHAR(30) NOT NULL,
    region VARCHAR(50) NOT NULL,
    subregion VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_country)
);

CREATE TABLE states(
    id_state INT NOT NULL AUTO_INCREMENT,
	state VARCHAR(50) NOT NULL,
    id_country INT NOT NULL,
    PRIMARY KEY(id_state),
    FOREIGN KEY (id_country) REFERENCES countries(id_country)
);

CREATE TABLE cities(
    id_city INT NOT NULL AUTO_INCREMENT,
	city VARCHAR(50) NOT NULL,
    address VARCHAR(50) NULL,
    id_country INT NOT NULL,
    id_state INT NOT NULL,
    PRIMARY KEY(id_city),
    FOREIGN KEY (id_country) REFERENCES countries(id_country),
    FOREIGN KEY (id_state) REFERENCES states(id_state)
);

CREATE TABLE companies(
    id_company INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    phone BIGINT NOT NULL,
    id_city INT NOT NULL,
    PRIMARY KEY(id_company),
    FOREIGN KEY (id_city) REFERENCES cities(id_city)
);

CREATE TABLE contacts(
    id_contact INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    profile_photo VARCHAR(200) NOT NULL,
    position VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    id_company INT NOT NULL,
    id_city INT NOT NULL,
    interest INT NOT NULL,
    PRIMARY KEY(id_contact),
    FOREIGN KEY (id_company) REFERENCES companies(id_company),
    FOREIGN KEY (id_city) REFERENCES cities(id_city)
);

CREATE TABLE channels(
    id_channel INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    user_account VARCHAR(50) NOT NULL,
    preferences VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_channel)
);

CREATE TABLE contacts_channels(
    id_contact INT NOT NULL,
	id_channel INT NOT NULL,
    PRIMARY KEY(id_contact, id_channel),
    FOREIGN KEY (id_contact) REFERENCES contacts(id_contact),
    FOREIGN KEY (id_channel) REFERENCES channels(id_channel)
);