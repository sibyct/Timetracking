-- ========================================
-- Create Schema (optional)
-- ========================================
CREATE SCHEMA IF NOT EXISTS hr;
SET search_path TO hr;

-- ========================================
-- 1️⃣ DEPARTMENTS
-- ========================================
CREATE TABLE departments (
    department_id      SERIAL PRIMARY KEY,
    department_name    VARCHAR(100) NOT NULL UNIQUE,
    manager_id         INT NULL,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- 2️⃣ JOB POSITIONS
-- ========================================
CREATE TABLE jobs (
    job_id             SERIAL PRIMARY KEY,
    job_title          VARCHAR(100) NOT NULL,
    min_salary         NUMERIC(10,2),
    max_salary         NUMERIC(10,2),
    CONSTRAINT chk_salary_range CHECK (min_salary <= max_salary)
);

-- ========================================
-- 3️⃣ EMPLOYEES
-- ========================================
CREATE TABLE employees (
    employee_id        SERIAL PRIMARY KEY,
    first_name         VARCHAR(50),
    last_name          VARCHAR(50) NOT NULL,
    email              VARCHAR(100) NOT NULL UNIQUE,
    phone_number       VARCHAR(20),
    hire_date          DATE NOT NULL,
    department_id      INT REFERENCES departments(department_id),
    job_id             INT NOT NULL REFERENCES jobs(job_id),
    manager_id         INT,
    status             VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','INACTIVE','TERMINATED')),
    date_of_birth      DATE,
    gender             VARCHAR(10) CHECK (gender IN ('M','F','OTHER')),
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add FK for department manager now that employees exists
ALTER TABLE departments
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id)
REFERENCES employees(employee_id) ON DELETE SET NULL;

-- Add FK manager self reference
ALTER TABLE employees
ADD CONSTRAINT fk_employee_manager FOREIGN KEY (manager_id)
REFERENCES employees(employee_id) ON DELETE SET NULL;

-- ========================================
-- 4️⃣ SALARY HISTORY
-- ========================================
CREATE TABLE salaries (
    salary_id          SERIAL PRIMARY KEY,
    employee_id        INT NOT NULL REFERENCES employees(employee_id),
    salary_amount      NUMERIC(10,2) NOT NULL CHECK (salary_amount > 0),
    start_date         DATE NOT NULL,
    end_date           DATE,
    CONSTRAINT chk_salary_date CHECK (end_date IS NULL OR end_date > start_date)
);

-- ========================================
-- 5️⃣ LEAVE TYPES
-- ========================================
CREATE TABLE leave_types (
    leave_type_id      SERIAL PRIMARY KEY,
    leave_name         VARCHAR(50) NOT NULL UNIQUE,
    max_days_allowed   INT DEFAULT 30
);

-- ========================================
-- 6️⃣ EMPLOYEE LEAVE REQUESTS
-- ========================================
CREATE TABLE leave_requests (
    leave_id           SERIAL PRIMARY KEY,
    employee_id        INT NOT NULL REFERENCES employees(employee_id),
    leave_type_id      INT NOT NULL REFERENCES leave_types(leave_type_id),
    start_date         DATE NOT NULL,
    end_date           DATE NOT NULL,
    status             VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','REJECTED')),
    request_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_leave_period CHECK (end_date >= start_date)
);

-- ========================================
-- 7️⃣ ATTENDANCE RECORD
-- ========================================
CREATE TABLE attendance (
    attendance_id      SERIAL PRIMARY KEY,
    employee_id        INT NOT NULL REFERENCES employees(employee_id),
    attendance_date    DATE NOT NULL,
    check_in_time      TIME,
    check_out_time     TIME,
    CONSTRAINT uq_attendance UNIQUE (employee_id, attendance_date)
);

-- ========================================
-- 8️⃣ USERS (LOGIN ACCOUNTS)
-- ========================================
CREATE TABLE users (
    user_id           SERIAL PRIMARY KEY,
    employee_id       INT UNIQUE REFERENCES employees(employee_id) ON DELETE CASCADE,
    username          VARCHAR(50) NOT NULL UNIQUE,
    password_hash     VARCHAR(255) NOT NULL,
    role              VARCHAR(30) DEFAULT 'EMPLOYEE' CHECK (role IN ('HR_ADMIN','MANAGER','EMPLOYEE')),
    is_active         BOOLEAN DEFAULT TRUE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
