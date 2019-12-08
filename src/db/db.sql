CREATE DATABASE begoos;

USE begoos;

CREATE TABLE users(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(128) NOT NULL,
    given_name VARCHAR(50) NULL,
    surname VARCHAR(50) NULL,
    document_type VARCHAR(50) NULL,
    document_id VARCHAR(50) NULL,
    phone VARCHAR(15) NULL,
    mobile_phone VARCHAR(15) NULL,
    avatar VARCHAR(255),
    signup_date DATE DEFAULT current_timestamp,
    last_login DATE
);

CREATE TABLE organizations(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    organization_name VARCHAR(150) NOT NULL,
    organization_id VARCHAR(50) NULL,
    organization_address VARCHAR(255) NULL,
    organization_location VARCHAR(150) NULL,
    country VARCHAR(65) NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE users_organizations(
    user_id INT(11) NOT NULL,
    organization_id INT(11) NOT NULL,
    CONSTRAINT users_organizations_organizations FOREIGN KEY (organization_id) REFERENCES organizations(id),
    CONSTRAINT users_organizations_users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT users_organizations_unique UNIQUE (organization_id, user_id)
);

CREATE TABLE contracts(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    contract_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    organization_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organizations(id)
);