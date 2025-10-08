CREATE TABLE "admins" (
  "admin_id" bigint NOT NULL AUTO_INCREMENT,
  "role" enum('ADMIN') DEFAULT 'ADMIN',
  "first_name" varchar(50) DEFAULT NULL,
  "last_name" varchar(50) DEFAULT NULL,
  "email" varchar(100) NOT NULL,
  "phone_number" varchar(25) DEFAULT NULL,
  "password_hash" varchar(100) DEFAULT NULL,
  "status" enum('ACTIVE','INACTIVE','SUSPENDED') DEFAULT NULL,
  "two_factor" varchar(250) DEFAULT NULL,
  "last_login" datetime DEFAULT NULL,
  "created_at" datetime DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("admin_id")
);

CREATE TABLE users (
  user_id INT DEFAULT NULL,
  email VARCHAR(320) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  gender ENUM('MALE','FEMALE','NONBINARY','PREFER NOT TO SAY') DEFAULT NULL,
  date_of_birth DATE DEFAULT NULL,
  accessibility_needs VARCHAR(45) DEFAULT NULL,
  company_name VARCHAR(45) DEFAULT NULL,
  job_title VARCHAR(45) DEFAULT NULL,
  country VARCHAR(100) DEFAULT NULL,
  password_hash VARCHAR(250) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (email)
);

CREATE TABLE event_registrations (
  registration_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(45) DEFAULT NULL,
  event_id BIGINT UNSIGNED NOT NULL,
  role ENUM('ATTENDEE','SPEAKER','SPONSOR') NOT NULL,
  first_time_attendee ENUM('YES','NO') DEFAULT NULL,
  how_did_you_hear_about_us ENUM('FRIEND','FAMILY','GOOGLE','AD','OTHER') DEFAULT NULL,
  industry ENUM('GOVERNMENT','NONPROFIT','EDUCATION','PRIVATE','OTHER') DEFAULT NULL,
  company_size INT DEFAULT NULL,
  environmental_priorities VARCHAR(50) DEFAULT NULL,
  dietary_preferences VARCHAR(100) DEFAULT NULL,
  scholarship_donation DECIMAL(10,2) DEFAULT NULL,
  may_publish_email ENUM('YES','NO') DEFAULT NULL,
  status ENUM('PENDING','CONFIRMED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at VARCHAR(45) DEFAULT NULL,
  updated_at VARCHAR(45) DEFAULT NULL,
  ticket_type ENUM('REGULAR','GOVERNMENT, UNIVERSITY, OR NONPROFIT','STUDENT') DEFAULT NULL,
  event_specific_accessibility VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (registration_id),
  UNIQUE KEY uq_user_event_role (event_id, role),
  KEY fk_reg_event (event_id),
  CONSTRAINT fk_reg_event FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE
);

CREATE TABLE booths (
  booth_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  event_id BIGINT UNSIGNED NOT NULL,
  booth_number VARCHAR(50) NOT NULL,
  size_sqft INT UNSIGNED DEFAULT NULL,
  location VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (booth_id),
  UNIQUE KEY uq_booth_event_num (event_id, booth_number),
  CONSTRAINT fk_booths_event FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE
);

CREATE TABLE booth_assignments (
  booth_assignment_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  booth_id BIGINT UNSIGNED NOT NULL,
  registration_id BIGINT UNSIGNED NOT NULL,
  assigned_by BIGINT DEFAULT NULL,
  assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  PRIMARY KEY (booth_assignment_id),
  UNIQUE KEY uq_event_booth (registration_id, booth_id),
  UNIQUE KEY uq_event_org_booth (registration_id),
  KEY fk_ba_booth (booth_id),
  CONSTRAINT fk_ba_booth FOREIGN KEY (booth_id) REFERENCES booths (booth_id) ON DELETE RESTRICT,
  CONSTRAINT fk_ba_event FOREIGN KEY (registration_id) REFERENCES events (event_id) ON DELETE CASCADE
);

CREATE TABLE events (
  event_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NOT NULL,
  venue_name VARCHAR(200) DEFAULT NULL,
  address_line1 VARCHAR(200) DEFAULT NULL,
  address_line2 VARCHAR(200) DEFAULT NULL,
  city VARCHAR(100) DEFAULT NULL,
  region VARCHAR(100) DEFAULT NULL,
  country VARCHAR(100) DEFAULT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('upcoming','ongoing','completed','cancelled') DEFAULT NULL,
  PRIMARY KEY (event_id)
);

CREATE TABLE event_sponsors (
  sponsor_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  event_id BIGINT UNSIGNED NOT NULL,
  sponsor_name VARCHAR(250) DEFAULT NULL,
  sponsorship_level ENUM('PLATINUM','GOLD','SILVER','BRONZE','OTHER') NOT NULL DEFAULT 'OTHER',
  contact_email VARCHAR(320) NOT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT NULL,
  PRIMARY KEY (sponsor_id),
  UNIQUE KEY uq_event_org (event_id),
  KEY fk_es_contact (contact_email),
  CONSTRAINT fk_es_contact FOREIGN KEY (contact_email) REFERENCES users (email) ON DELETE RESTRICT,
  CONSTRAINT fk_es_event FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE
);

CREATE TABLE organizations (
  org_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  org_name VARCHAR(200) NOT NULL,
  website VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(40) DEFAULT NULL,
  billing_email VARCHAR(320) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT NULL,
  PRIMARY KEY (org_id),
  UNIQUE KEY name (org_name)
);

CREATE TABLE rooms (
  room_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  event_id BIGINT UNSIGNED NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  capacity INT UNSIGNED DEFAULT NULL,
  created_at DATETIME DEFAULT NULL,
  PRIMARY KEY (room_id),
  UNIQUE KEY uq_room_event_num (event_id, room_number),
  CONSTRAINT fk_rooms_event FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE
);

CREATE TABLE session_categories (
  category_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(150) NOT NULL,
  description TEXT,
  PRIMARY KEY (category_id)
);

CREATE TABLE session_enrollments (
  session_id BIGINT UNSIGNED NOT NULL,
  user_email VARCHAR(320) NOT NULL,
  enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id, user_email),
  KEY fk_se_user (user_email),
  CONSTRAINT fk_se_session FOREIGN KEY (session_id) REFERENCES sessions (session_id) ON DELETE CASCADE
);

CREATE TABLE session_proposals (
  proposal_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  registration_id VARCHAR(45) DEFAULT NULL,
  event_id BIGINT UNSIGNED NOT NULL,
  proposer_email VARCHAR(320) NOT NULL,
  title VARCHAR(200) NOT NULL,
  abstract TEXT NOT NULL,
  category_id BIGINT UNSIGNED DEFAULT NULL,
  preferred_time_note VARCHAR(200) DEFAULT NULL,
  status ENUM('SUBMITTED','UNDER_REVIEW','APPROVED','REJECTED','WITHDRAWN') NOT NULL DEFAULT 'SUBMITTED',
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL DEFAULT NULL,
  reviewer_notes TEXT,
  approved_session_id BIGINT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (proposal_id),
  UNIQUE KEY approved_session_id (approved_session_id),
  KEY fk_sp_event (event_id),
  KEY fk_sp_proposer (proposer_email),
  KEY fk_sp_category (category_id),
  CONSTRAINT fk_sp_approved_session FOREIGN KEY (approved_session_id) REFERENCES sessions (session_id) ON DELETE SET NULL,
  CONSTRAINT fk_sp_category FOREIGN KEY (category_id) REFERENCES session_categories (category_id) ON DELETE SET NULL,
  CONSTRAINT fk_sp_event FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE,
  CONSTRAINT fk_sp_proposer FOREIGN KEY (proposer_email) REFERENCES users (email) ON DELETE CASCADE
);

CREATE TABLE sessions (
  session_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  event_id BIGINT UNSIGNED NOT NULL,
  category_id BIGINT UNSIGNED DEFAULT NULL,
  title VARCHAR(200) NOT NULL,
  abstract TEXT,
  room_id BIGINT UNSIGNED DEFAULT NULL,
  start_datetime DATETIME DEFAULT NULL,
  end_datetime DATETIME DEFAULT NULL,
  status ENUM('DRAFT','APPROVED','SCHEDULED','CANCELLED') NOT NULL DEFAULT 'DRAFT',
  lead_speaker_email VARCHAR(320) DEFAULT NULL,
  PRIMARY KEY (session_id),
  KEY fk_sessions_event (event_id),
  KEY fk_sessions_room (room_id),
  KEY fk_sessions_category (category_id),
  KEY fk_sessions_lead_speaker (lead_speaker_email),
  CONSTRAINT fk_sessions_category FOREIGN KEY (category_id) REFERENCES session_categories (category_id) ON DELETE SET NULL,
  CONSTRAINT fk_sessions_event FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE CASCADE,
  CONSTRAINT fk_sessions_lead_speaker FOREIGN KEY (lead_speaker_email) REFERENCES users (email) ON DELETE SET NULL,
  CONSTRAINT fk_sessions_room FOREIGN KEY (room_id) REFERENCES rooms (room_id) ON DELETE SET NULL
);

CREATE TABLE session_speakers (
  session_id BIGINT UNSIGNED NOT NULL,
  event_id INT DEFAULT NULL,
  session_name VARCHAR(45) DEFAULT NULL,
  start_time DATETIME DEFAULT NULL,
  end_time DATETIME DEFAULT NULL,
  PRIMARY KEY (session_id),
  CONSTRAINT fk_ss_session FOREIGN KEY (session_id) REFERENCES sessions (session_id) ON DELETE CASCADE
);
