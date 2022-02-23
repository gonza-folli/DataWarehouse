INSERT INTO users (name,  lastname, email, rol, password) VALUES
('Admin', 'Admin', 'masteruser', 'admin', 'admin'),
('Gonzalo', 'Folli', 'gonza_folli@hotmail.com', 'user', '212223');

INSERT INTO cities (city,  address, id_country, id_state) VALUES
('San Francisco', 'Castelli 2190', 11, 3642),
('Córdoba', 'Rondeau 430', 11, 3642),
('Medellin', 'Escobar 1458', 48, 2890),
('Itapema', 'Rua 105 N 268', 31, 2014),
('San Antonio', 'Washington 827', 233, 1407),
('Mountain View', '1600 Amphitheatre Parkway', 233, 1416),
('Seattle', '325 9th Avenue 98101', 233, 1462),
('Austin', '13101 Harold Green Road', 233, 1407),
('Ciudad Autónoma de Buenos Aires', 'Av. Caseros 3039', 11, 4880);

INSERT INTO companies (name, phone, id_city) VALUES
('Google', '16502065555', 6),
('Amazon', '12062662992', 7),
('Tesla', '16502213510', 8),
('Mercadolibre', '01146408000', 9);


INSERT INTO contacts (name,  lastname, profile_photo, position, email, id_company, id_city, interest) VALUES
('Gonzalo', 'Folli', 'https://i.imgur.com/3RegT51_d.webp', 'Estudiante', 'gonza_folli@hotmail.com', 1, 2, 50 ),
('Martin', 'Cravero', 'https://i.imgur.com/3RegT51_d.webp', 'Contador', 'martin_cravero@hotmail.com', 2, 3, 100 ),
('Federico', 'Kuibida', 'https://i.imgur.com/3RegT51_d.webp', 'Contador', 'federico_kuibida@hotmail.com', 3, 4, 25 ),
('Gaston', 'Nobs', 'https://i.imgur.com/3RegT51_d.webp', 'Maderero', 'gaston_nobs@hotmail.com', 4, 5, 100 ),
('Cristian', 'Barbarini', 'https://i.imgur.com/3RegT51_d.webp', 'Programador', 'cristian_barbarini@hotmail.com', 1, 1, 25 ),
('Federico', 'Bonino', 'https://i.imgur.com/3RegT51_d.webp', 'Emprendedor', 'federico_bonino@hotmail.com', 2, 1, 50 ),
('Jorge', 'Folli', 'https://i.imgur.com/3RegT51_d.webp', 'Mecanico', 'jorge_folli@hotmail.com', 4, 2, 25 ),
('Agustin', 'Rossetti', 'https://i.imgur.com/3RegT51_d.webp', 'Medico', 'agustin_rossetti@hotmail.com', 3, 1, 100 ),
('Esteban', 'Bianco', 'https://i.imgur.com/3RegT51_d.webp', 'Agropecuario', 'esteban_bianco@hotmail.com', 2, 2, 100 ),
('Lionel', 'Messi', 'https://i.imgur.com/3RegT51_d.webp', 'Futbolista', 'lionel_messi@hotmail.com', 1, 4, 50 ),
('Franco', 'Silvestro', 'https://i.imgur.com/3RegT51_d.webp', 'Emprendedor', 'franco_silvestro@hotmail.com', 3, 3, 25 ),
('Juan', 'Perez', 'https://i.imgur.com/3RegT51_d.webp', 'Mecanico', 'juan_perez@hotmail.com', 3, 2, 25 ),
('Raul', 'Galarza', 'https://i.imgur.com/3RegT51_d.webp', 'Jubilado', 'raul_galarza@hotmail.com', 4, 5, 50 ),
('Julian', 'Balsa', 'https://i.imgur.com/3RegT51_d.webp', 'Medico', 'julian_balsa@hotmail.com', 2, 1, 25 ),
('Silvio', 'Cerutti', 'https://i.imgur.com/3RegT51_d.webp', 'Agropecuario', 'silvio_cerutti@hotmail.com', 1, 5, 50 );


INSERT INTO channels (name,  user_account, preferences) VALUES
('Whatsapp', '3564334501', 'No molestar' ),
('Instagram', 'gonzafolli', 'Canal favorito' ),
('Facebook', 'martincravero', 'Sin preferencia' ),
('Instagram', 'm.cravero', 'Canal favorito' ),
('Twitter', 'fedekuibida', 'No molestar' ),
('Instagram', 'gasnobs', 'Canal favorito' ),
('Whatsapp', '3564253647', 'Sin preferencia' ),
('Instagram', 'fedebonino', 'No molestar' ),
('Whatsapp', '3564253634', 'Canal favorito' ),
('Instagram', 'agurossetti', 'Canal favorito' ),
('Whatsapp', '356428743', 'Sin preferencia' ),
('Facebook', 'leomessi', 'No molestar' ),
('Twitter', 'fsilvestro', 'Canal favorito' ),
('Instagram', 'jpjperez', 'Sin preferencia' ),
('Facebook', 'raulgalar', 'No molestar' ),
('Instagram', 'julibalsa', 'Sin preferencia' ),
('Twitter', 'silcerutti', 'Canal favorito' );

INSERT INTO contacts_channels (id_contact,  id_channel) VALUES
(1, 1 ),
(1, 2 ),
(2, 3 ),
(2, 4 ),
(3, 5 ),
(4, 6 ),
(5, 7 ),
(6, 8 ),
(7, 9 ),
(8, 10 ),
(9, 11 ),
(10, 12 ),
(11, 13 ),
(12, 14 ),
(13, 15 ),
(14, 16 ),
(15, 17 );