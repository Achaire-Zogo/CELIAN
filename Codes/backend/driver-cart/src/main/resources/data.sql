-- Mot de passe: admin123 (encodé avec BCrypt)
INSERT INTO users (
    email,
    password,
    name,
    client_type,
    first_name,
    last_name,
    phone_number,
    created_at,
    updated_at
)
VALUES (
    'admin@celian.com',
    '$2a$10$rS.bO0yHgG5qklUw/sN3wOqyOF/YO42R8iBkVP3bCZWaJ62vWeXSi',
    'Administrator',
    'INDIVIDUAL',
    'Admin',
    'User',
    '+237000000000',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON DUPLICATE KEY UPDATE email = email;

INSERT INTO countries (name, tax_rate) VALUES ('Nigeria', 0.12);
INSERT INTO countries (name, tax_rate) VALUES ('South Africa', 0.14);
INSERT INTO countries (name, tax_rate) VALUES ('Kenya', 0.10);
INSERT INTO countries (name, tax_rate) VALUES ('Egypt', 0.18);
INSERT INTO countries (name, tax_rate) VALUES ('Morocco', 0.15);
INSERT INTO countries (name, tax_rate) VALUES ('Ghana', 0.13);
INSERT INTO countries (name, tax_rate) VALUES ('Senegal', 0.11);
INSERT INTO countries (name, tax_rate) VALUES ('Cameroon', 0.24);
INSERT INTO countries (name, tax_rate) VALUES ('Ethiopia', 0.08);
INSERT INTO countries (name, tax_rate) VALUES ('Ivory Coast', 0.16);
INSERT INTO countries (name, tax_rate) VALUES ('United States', 0.07);
INSERT INTO countries (name, tax_rate) VALUES ('Canada', 0.13);
INSERT INTO countries (name, tax_rate) VALUES ('Mexico', 0.16);
INSERT INTO countries (name, tax_rate) VALUES ('Costa Rica', 0.15);
INSERT INTO countries (name, tax_rate) VALUES ('Panama', 0.12);
INSERT INTO countries (name, tax_rate) VALUES ('Guatemala', 0.14);
INSERT INTO countries (name, tax_rate) VALUES ('Honduras', 0.10);
INSERT INTO countries (name, tax_rate) VALUES ('El Salvador', 0.11);
INSERT INTO countries (name, tax_rate) VALUES ('Jamaica', 0.18);
INSERT INTO countries (name, tax_rate) VALUES ('Dominican Republic', 0.17);
INSERT INTO countries (name, tax_rate) VALUES ('Brazil', 0.20);
INSERT INTO countries (name, tax_rate) VALUES ('Argentina', 0.18);
INSERT INTO countries (name, tax_rate) VALUES ('Chile', 0.19);
INSERT INTO countries (name, tax_rate) VALUES ('Colombia', 0.16);
INSERT INTO countries (name, tax_rate) VALUES ('Peru', 0.15);
INSERT INTO countries (name, tax_rate) VALUES ('Venezuela', 0.22);
INSERT INTO countries (name, tax_rate) VALUES ('Ecuador', 0.14);
INSERT INTO countries (name, tax_rate) VALUES ('Bolivia', 0.12);
INSERT INTO countries (name, tax_rate) VALUES ('Paraguay', 0.13);
INSERT INTO countries (name, tax_rate) VALUES ('Uruguay', 0.17);
INSERT INTO countries (name, tax_rate) VALUES ('China', 0.10);
INSERT INTO countries (name, tax_rate) VALUES ('India', 0.18);
INSERT INTO countries (name, tax_rate) VALUES ('Japan', 0.08);
INSERT INTO countries (name, tax_rate) VALUES ('South Korea', 0.07);
INSERT INTO countries (name, tax_rate) VALUES ('Thailand', 0.12);
INSERT INTO countries (name, tax_rate) VALUES ('Vietnam', 0.15);
INSERT INTO countries (name, tax_rate) VALUES ('Indonesia', 0.11);
INSERT INTO countries (name, tax_rate) VALUES ('Malaysia', 0.09);
INSERT INTO countries (name, tax_rate) VALUES ('Philippines', 0.13);
INSERT INTO countries (name, tax_rate) VALUES ('Singapore', 0.20);
INSERT INTO countries (name, tax_rate) VALUES ('France', 0.20);
INSERT INTO countries (name, tax_rate) VALUES ('Germany', 0.19);
INSERT INTO countries (name, tax_rate) VALUES ('Italy', 0.22);
INSERT INTO countries (name, tax_rate) VALUES ('Spain', 0.21);
INSERT INTO countries (name, tax_rate) VALUES ('United Kingdom', 0.18);
INSERT INTO countries (name, tax_rate) VALUES ('Netherlands', 0.17);
INSERT INTO countries (name, tax_rate) VALUES ('Sweden', 0.25);
INSERT INTO countries (name, tax_rate) VALUES ('Poland', 0.23);
INSERT INTO countries (name, tax_rate) VALUES ('Greece', 0.24);
INSERT INTO countries (name, tax_rate) VALUES ('Switzerland', 0.08);
INSERT INTO countries (name, tax_rate) VALUES ('Australia', 0.10);
INSERT INTO countries (name, tax_rate) VALUES ('New Zealand', 0.15);
INSERT INTO countries (name, tax_rate) VALUES ('Fiji', 0.12);
INSERT INTO countries (name, tax_rate) VALUES ('Papua New Guinea', 0.14);
INSERT INTO countries (name, tax_rate) VALUES ('Samoa', 0.11);
INSERT INTO countries (name, tax_rate) VALUES ('Tonga', 0.13);
INSERT INTO countries (name, tax_rate) VALUES ('Vanuatu', 0.09);
INSERT INTO countries (name, tax_rate) VALUES ('Solomon Islands', 0.08);
INSERT INTO countries (name, tax_rate) VALUES ('New Caledonia', 0.16);
INSERT INTO countries (name, tax_rate) VALUES ('Micronesia', 0.07);
