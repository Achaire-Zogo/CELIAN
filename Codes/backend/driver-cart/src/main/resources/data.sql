-- Mot de passe: admin123 (encodé avec BCrypt)
INSERT INTO users (
    email,
    password,
    name,
    role,
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
    'ADMIN',
    'INDIVIDUAL',
    'Admin',
    'User',
    '+237000000000',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON DUPLICATE KEY UPDATE email = email;
