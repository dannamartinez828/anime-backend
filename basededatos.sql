-- =====================================================
-- CREAR TABLA ANIMES
-- =====================================================

CREATE TABLE animes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT,
  portada_url TEXT
);

-- =====================================================
-- CREAR TABLA PERSONAJES
-- =====================================================

CREATE TABLE personajes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT,
  raza VARCHAR(100),
  poder TEXT,
  descripcion TEXT,
  categoria VARCHAR(100),
  anime_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (anime_id)
    REFERENCES animes(id)
    ON DELETE CASCADE
);

-- =====================================================
-- CREAR TABLA IMAGENES
-- =====================================================

CREATE TABLE imagenes (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  descripcion TEXT,
  personaje_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (personaje_id)
    REFERENCES personajes(id)
    ON DELETE CASCADE
);

-- =====================================================
-- INSERTAR ANIMES
-- =====================================================

INSERT INTO animes (nombre, descripcion) VALUES
(
  'saint seiya',
  'Caballeros que protegen a Atenea usando el cosmos'
),
(
  'hunterxhunter',
  'Hunters con habilidades Nen y aventuras peligrosas'
),
(
  'onepiece',
  'Piratas buscando el legendario tesoro One Piece'
);

-- =====================================================
-- INSERTAR PERSONAJES SAINT SEIYA  (anime_id = 1)
-- IDs resultantes: 1=Seiya, 2=Shiryu, 3=Hyoga, 4=Shun,
--                 5=Ikki,  6=Saori,  7=Mu,    8=Aiolia,
--                 9=Shaka, 10=Saga
-- =====================================================

INSERT INTO personajes
  (nombre, edad, raza, poder, descripcion, categoria, anime_id)
VALUES
(
  'Seiya',        13,  'Humano', 'Pegasus Ryusei Ken',
  'Caballero de Pegaso y protagonista principal',
  'Caballero de Bronce', 1
),
(
  'Shiryu',       14,  'Humano', 'Rozan Shoryu Ha',
  'Caballero del Dragón',
  'Caballero de Bronce', 1
),
(
  'Hyoga',        14,  'Humano', 'Diamond Dust',
  'Caballero del Cisne',
  'Caballero de Bronce', 1
),
(
  'Shun',         13,  'Humano', 'Nebula Chain',
  'Caballero de Andrómeda',
  'Caballero de Bronce', 1
),
(
  'Ikki',         15,  'Humano', 'Houyoku Tensho',
  'Caballero Fénix',
  'Caballero de Bronce', 1
),
(
  'Saori Kido',   13,  'Diosa',  'Cosmos de Atenea',
  'Reencarnación de Atenea',
  'Diosa', 1
),
(
  'Mu de Aries',  20,  'Humano', 'Starlight Extinction',
  'Caballero Dorado de Aries',
  'Caballero Dorado', 1
),
(
  'Aiolia de Leo',20,  'Humano', 'Lightning Plasma',
  'Caballero Dorado de Leo',
  'Caballero Dorado', 1
),
(
  'Shaka de Virgo',20, 'Humano', 'Tenbu Horin',
  'El hombre más cercano a Dios',
  'Caballero Dorado', 1
),
(
  'Saga de Géminis',28,'Humano', 'Galaxian Explosion',
  'Caballero Dorado de Géminis',
  'Caballero Dorado', 1
);

-- =====================================================
-- INSERTAR PERSONAJES HUNTER X HUNTER  (anime_id = 2)
-- IDs: 11=Gon, 12=Killua, 13=Kurapika, 14=Leorio,
--      15=Hisoka, 16=Chrollo, 17=Illumi,
--      18=Meruem, 19=Neferpitou, 20=Netero
-- =====================================================

INSERT INTO personajes
  (nombre, edad, raza, poder, descripcion, categoria, anime_id)
VALUES
(
  'Gon Freecss',      12,  'Humano',  'Jajanken',
  'Hunter principiante extremadamente talentoso',
  'Hunter', 2
),
(
  'Killua Zoldyck',   12,  'Humano',  'Electricidad / Godspeed',
  'Asesino de la familia Zoldyck',
  'Asesino', 2
),
(
  'Kurapika',         17,  'Humano',  'Chain Jail',
  'Último sobreviviente del clan Kurta',
  'Hunter', 2
),
(
  'Leorio Paradinight',19, 'Humano',  'Nen médico',
  'Hunter aspirante a médico',
  'Hunter', 2
),
(
  'Hisoka',           28,  'Humano',  'Bungee Gum',
  'Peligroso y extraño usuario Nen',
  'Villano', 2
),
(
  'Chrollo Lucilfer', 26,  'Humano',  'Skill Hunter',
  'Líder de la Genei Ryodan',
  'Villano', 2
),
(
  'Illumi Zoldyck',   24,  'Humano',  'Control con agujas',
  'Asesino profesional',
  'Asesino', 2
),
(
  'Meruem',           40,  'Quimera', 'Aura extrema',
  'Rey de las hormigas quimera',
  'Quimera', 2
),
(
  'Neferpitou',       30,  'Quimera', 'Doctor Blythe',
  'Guardia real de Meruem',
  'Quimera', 2
),
(
  'Netero',          110,  'Humano',  '100-Type Guanyin Bodhisattva',
  'Presidente de la Asociación Hunter',
  'Hunter', 2
);

-- =====================================================
-- INSERTAR PERSONAJES ONE PIECE  (anime_id = 3)
-- IDs: 21=Luffy, 22=Zoro, 23=Nami, 24=Usopp,
--      25=Sanji, 26=Chopper, 27=Robin,
--      28=Franky, 29=Brook, 30=Law
-- =====================================================

INSERT INTO personajes
  (nombre, edad, raza, poder, descripcion, categoria, anime_id)
VALUES
(
  'Monkey D. Luffy',  19,  'Humano',   'Gomu Gomu no Mi',
  'Capitán de los Sombrero de Paja',
  'Pirata', 3
),
(
  'Roronoa Zoro',     21,  'Humano',   'Santoryu',
  'Espadachín de la tripulación',
  'Pirata', 3
),
(
  'Nami',             20,  'Humano',   'Clima-Tact',
  'Navegante experta',
  'Pirata', 3
),
(
  'Usopp',            19,  'Humano',   'Francotirador',
  'Tirador de los Sombrero de Paja',
  'Pirata', 3
),
(
  'Sanji',            21,  'Humano',   'Diable Jambe',
  'Cocinero de la tripulación',
  'Pirata', 3
),
(
  'Tony Tony Chopper',17,  'Reno',     'Hito Hito no Mi',
  'Doctor de la tripulación',
  'Pirata', 3
),
(
  'Nico Robin',       30,  'Humano',   'Hana Hana no Mi',
  'Arqueóloga de los Sombrero de Paja',
  'Pirata', 3
),
(
  'Franky',           36,  'Cyborg',   'Armas mecánicas',
  'Carpintero cyborg',
  'Pirata', 3
),
(
  'Brook',            90,  'Esqueleto','Yomi Yomi no Mi',
  'Músico esqueleto',
  'Pirata', 3
),
(
  'Trafalgar Law',    26,  'Humano',   'Ope Ope no Mi',
  'Capitán pirata y médico',
  'Pirata', 3
);

-- =====================================================
-- INSERTAR IMÁGENES
-- Orden de imágenes recibidas (por nombre de archivo):
--   seiya(1), shaka(9), saga(10), aiolia(8), mu(7),
--   saori(6), ikki(5), shun(4), hyoga(3), shiryu(2)
--   → Saint Seiya completo
--   gon(11), killua(12), kurapika(13), leorio(14),
--   hisoka(15), chrollo(16), illumi(17), meruem(18),
--   pitou/neferpitou(19), netero(20)
--   → HxH completo
--   luffy(21), zoro(22), nami(23), usopp(24),
--   sanji(25), chopper(26), nicorobin(27), franky(28),
--   brook(29), law(30)
--   → One Piece completo
-- =====================================================

-- ── SEIYA (id = 1) ───────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778282101/seiya1_x3alty.jpg',  'Seiya imagen 1', 1),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778282100/seiya2_wbkehq.jpg',  'Seiya imagen 2', 1),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778282101/seiya3_s7aeeu.jpg',  'Seiya imagen 3', 1),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778282101/seiya4_dwctuu.jpg',  'Seiya imagen 4', 1);

-- ── SHIRYU (id = 2) ──────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284011/shiryu1_ntrte5.jpg', 'Shiryu imagen 1', 2),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284009/shiryu2_xcwy65.png', 'Shiryu imagen 2', 2),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284007/shiryu3_ndnwfv.jpg', 'Shiryu imagen 3', 2),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284006/shiryu4_tuzwdb.jpg', 'Shiryu imagen 4', 2);

-- ── HYOGA (id = 3) ───────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283924/hyoga1_dlkmra.jpg',  'Hyoga imagen 1', 3),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778294694/hyoga2_byg6zg.jpg',  'Hyoga imagen 2', 3),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778294408/hyoga3_acz2ty.jpg',  'Hyoga imagen 3', 3),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283920/hyoga4_lqkvqa.jpg',  'Hyoga imagen 4', 3);

-- ── SHUN (id = 4) ────────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283859/shun1_slv7lz.jpg',   'Shun imagen 1', 4),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283860/Shun2_laexnz.jpg',   'Shun imagen 2', 4),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283861/shun3_letvrs.jpg',   'Shun imagen 3', 4),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283862/shun4_ovpc36.jpg',   'Shun imagen 4', 4);

-- ── IKKI (id = 5) ────────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283791/ikki1_bbmvyk.jpg',   'Ikki imagen 1', 5),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283792/ikki2_lekzfu.jpg',   'Ikki imagen 2', 5),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283793/ikki3_tpixbm.jpg',   'Ikki imagen 3', 5),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283794/Ikki4_uhqppf.jpg',   'Ikki imagen 4', 5);

-- ── SAORI KIDO (id = 6) ──────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283727/saori1_phsamq.jpg',  'Saori imagen 1', 6),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283728/saori2_pthczx.jpg',  'Saori imagen 2', 6),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283729/saori3_gxgraj.jpg',  'Saori imagen 3', 6),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283730/saori4_yht3j3.jpg',  'Saori imagen 4', 6);

-- ── MU DE ARIES (id = 7) ─────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283659/mu1_hjfure.jpg',     'Mu imagen 1', 7),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283660/mu2_cytvty.jpg',     'Mu imagen 2', 7),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283661/mu3_qnkjzg.jpg',     'Mu imagen 3', 7),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283662/mu4_ctcwkn.jpg',     'Mu imagen 4', 7);

-- ── AIOLIA DE LEO (id = 8) ───────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283582/aiolia1_ar7nl4.jpg', 'Aiolia imagen 1', 8),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283583/aiolia2_qglvwg.jpg', 'Aiolia imagen 2', 8),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283584/aiolia3_pdtaci.jpg', 'Aiolia imagen 3', 8),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283585/aiolia4_mkqkop.jpg', 'Aiolia imagen 4', 8);

-- ── SHAKA DE VIRGO (id = 9) ──────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283431/shaka1_dnlcrm.jpg',  'Shaka imagen 1', 9),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283432/shaka2_ivqlq3.jpg',  'Shaka imagen 2', 9),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283432/shaka3_mubyot.jpg',  'Shaka imagen 3', 9),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283433/shaka4_lq49uo.jpg',  'Shaka imagen 4', 9);

-- ── SAGA DE GÉMINIS (id = 10) ────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283523/Saga1_ddm2c6.jpg',   'Saga imagen 1', 10),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283524/Saga2_fbptbg.jpg',   'Saga imagen 2', 10),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283524/Saga3_cpjpve.jpg',   'Saga imagen 3', 10),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778283525/Saga4_gkj5hq.jpg',   'Saga imagen 4', 10);

-- ── GON FREECSS (id = 11) ────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284133/gon1_t2ctno.jpg',    'Gon imagen 1', 11),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284135/gon2_srroug.jpg',    'Gon imagen 2', 11),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284136/gon3_rg330n.jpg',    'Gon imagen 3', 11),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284138/gon4_bdfjpl.jpg',    'Gon imagen 4', 11);

-- ── KILLUA ZOLDYCK (id = 12) ─────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284554/killua1_hchwi6.jpg', 'Killua imagen 1', 12),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284556/killua2_yqdamz.jpg', 'Killua imagen 2', 12),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284557/killua3_zcqky4.jpg', 'Killua imagen 3', 12),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284559/killua4_fcmbk8.jpg', 'Killua imagen 4', 12);

-- ── KURAPIKA (id = 13) ───────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284619/kurapika1_jv3v4w.jpg','Kurapika imagen 1', 13),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284621/kurapika2_h0dgwa.jpg','Kurapika imagen 2', 13),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284623/kurapika3_r75vll.jpg','Kurapika imagen 3', 13),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284625/kurapika4_alxxbr.jpg','Kurapika imagen 4', 13);

-- ── LEORIO PARADINIGHT (id = 14) ─────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284669/Leorio1_obv7nq.jpg', 'Leorio imagen 1', 14),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284670/Leorio2_ck2hcy.jpg', 'Leorio imagen 2', 14),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284672/Leorio3_wpphlf.jpg', 'Leorio imagen 3', 14),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284674/Leorio4_kn2iof.jpg', 'Leorio imagen 4', 14);

-- ── HISOKA (id = 15) ─────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284726/hisoka1_r0wxhj.jpg', 'Hisoka imagen 1', 15),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284728/hisoka2_ljuuin.jpg', 'Hisoka imagen 2', 15),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284730/hisoka3_baobr2.jpg', 'Hisoka imagen 3', 15),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284732/hisoka4_qrioto.jpg', 'Hisoka imagen 4', 15);

-- ── CHROLLO LUCILFER (id = 16) ───────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284777/chrollo1_juni0d.jpg','Chrollo imagen 1', 16),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284779/chrollo2_mksrpn.jpg','Chrollo imagen 2', 16),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284781/chrollo3_maslhe.jpg','Chrollo imagen 3', 16),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284783/chrollo4_hdrn1h.jpg','Chrollo imagen 4', 16);

-- ── ILLUMI ZOLDYCK (id = 17) ─────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284842/illumi1_na5vfr.jpg', 'Illumi imagen 1', 17),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284843/illumi2_kkcqai.jpg', 'Illumi imagen 2', 17),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284846/illumi3_yagoxx.jpg', 'Illumi imagen 3', 17),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284848/illumi4_opzcco.jpg', 'Illumi imagen 4', 17);

-- ── MERUEM (id = 18) ─────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284886/meruem1_lsbyvp.jpg', 'Meruem imagen 1', 18),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284888/meruem2_vecdcu.jpg', 'Meruem imagen 2', 18),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284890/meruem3_r8orrz.jpg', 'Meruem imagen 3', 18),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284892/meruem4_d8jxn6.jpg', 'Meruem imagen 4', 18);

-- ── NEFERPITOU (id = 19) ─────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284946/pitou1_dithcn.jpg',  'Neferpitou imagen 1', 19),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284948/pitou2_fotoql.jpg',  'Neferpitou imagen 2', 19),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284951/pitou3_iehmw4.jpg',  'Neferpitou imagen 3', 19),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778284953/pitou4_t1zx6d.jpg',  'Neferpitou imagen 4', 19);

-- ── NETERO (id = 20) ─────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285020/netero1_oxxgrj.jpg', 'Netero imagen 1', 20),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285023/netero2_q9rbcq.jpg', 'Netero imagen 2', 20),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285025/netero3_xcx8km.jpg', 'Netero imagen 3', 20),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285027/netero4_nuazc9.jpg', 'Netero imagen 4', 20);

-- ── MONKEY D. LUFFY (id = 21) ────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285101/luffy1_syvxbh.jpg',  'Luffy imagen 1', 21),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285104/luffy2_oat7jx.jpg',  'Luffy imagen 2', 21),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285107/luffy3_zby5ol.jpg',  'Luffy imagen 3', 21),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285098/luffy4_nwng4i.jpg',  'Luffy imagen 4', 21);

-- ── RORONOA ZORO (id = 22) ───────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285217/zoro1_igdjvd.jpg',   'Zoro imagen 1', 22),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285214/zoro2_bmuf8e.jpg',   'Zoro imagen 2', 22),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285220/zoro3_ajyshh.jpg',   'Zoro imagen 3', 22),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285257/zoro4_wmz4ed.jpg',   'Zoro imagen 4', 22);

-- ── NAMI (id = 23) ───────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285348/nami1_fr750x.jpg',   'Nami imagen 1', 23),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285349/nami2_eb1ale.jpg',   'Nami imagen 2', 23),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285349/nami3_upxjqm.jpg',   'Nami imagen 3', 23),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285349/nami4_dvbuhe.jpg',   'Nami imagen 4', 23);

-- ── USOPP (id = 24) ──────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285411/usopp1_tjeibk.jpg',  'Usopp imagen 1', 24),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285408/usopp2_dds1nc.jpg',  'Usopp imagen 2', 24),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285409/usopp3_wzzzif.jpg',  'Usopp imagen 3', 24),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285409/usopp4_egfm0u.jpg',  'Usopp imagen 4', 24);

-- ── SANJI (id = 25) ──────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285465/sanji1_r3gwjb.jpg',  'Sanji imagen 1', 25),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285465/sanji2_cznp7u.jpg',  'Sanji imagen 2', 25),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285466/sanji3_tojxkt.jpg',  'Sanji imagen 3', 25),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285467/sanji4_s6z61n.jpg',  'Sanji imagen 4', 25);

-- ── TONY TONY CHOPPER (id = 26) ──────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285526/chopper1_jpdrcr.jpg','Chopper imagen 1', 26),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285526/chopper2_oxdmlx.jpg','Chopper imagen 2', 26),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285528/chopper3_cuveic.jpg','Chopper imagen 3', 26),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285529/chopper4_w42hgx.jpg','Chopper imagen 4', 26);

-- ── NICO ROBIN (id = 27) ─────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285575/nicorobin1_voxwvk.jpg','Nico Robin imagen 1', 27),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285576/nicorobin2_p3iqzv.jpg','Nico Robin imagen 2', 27),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285577/nicorobin3_gntsdz.jpg','Nico Robin imagen 3', 27),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285578/nicorobin4_rfa7tn.jpg','Nico Robin imagen 4', 27);

-- ── FRANKY (id = 28) ─────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285632/franky1_kas13r.jpg', 'Franky imagen 1', 28),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285636/franky2_rjcudf.jpg', 'Franky imagen 2', 28),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285633/franky3_r8vvmt.jpg', 'Franky imagen 3', 28),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285635/franky4_vr39ci.jpg', 'Franky imagen 4', 28);

-- ── BROOK (id = 29) ──────────────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285715/brook1_o7ghmc.jpg',  'Brook imagen 1', 29),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285716/brook2_enhgoc.jpg',  'Brook imagen 2', 29),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285717/brook3_vfv6gg.jpg',  'Brook imagen 3', 29),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285719/brook4_vagzf3.jpg',  'Brook imagen 4', 29);

-- ── TRAFALGAR LAW (id = 30) ──────────────────────────
INSERT INTO imagenes (url, descripcion, personaje_id) VALUES
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285771/law1_cphpwz.jpg',    'Law imagen 1', 30),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285772/law2_mex2lk.jpg',    'Law imagen 2', 30),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285773/law3_rmgfzd.jpg',    'Law imagen 3', 30),
('https://res.cloudinary.com/dq02mysvu/image/upload/v1778285773/law4_azjg5s.jpg',    'Law imagen 4', 30);

-- =====================================================
-- CONSULTA PARA EXPO  (buscar personaje por nombre)
-- =====================================================

SELECT
  p.id,
  p.nombre,
  p.edad,
  p.raza,
  p.poder,
  p.descripcion,
  p.categoria,
  a.nombre AS anime,
  json_agg(i.url ORDER BY i.id) AS imagenes
FROM personajes p
JOIN animes a ON p.anime_id = a.id
LEFT JOIN imagenes i ON i.personaje_id = p.id
WHERE LOWER(p.nombre) LIKE LOWER('%Seiya%')
GROUP BY p.id, a.nombre;