
-- |----- allgemein wichtige codes öffter verwendet ----- |

-- Datentyp ändern
ALTER TABLE food_type  
ALTER COLUMN name SET DATA TYPE character varying (30);

-- Deafaule im Nachhinein setzen
ALTER TABLE account 
ALTER COLUMN created_on SET DEFAULT CURRENT_TIMESTAMP;

-- Datentyp von time zu date ändern
ALTER TABLE account 
ALTER COLUMN birth_date TYPE DATE 
USING '2000-01-01'::DATE;



-- |----- account machen ----- |

INSERT INTO account
 (user_name, birth_date, "e-mail", password, last_login, is_active, role_id, last_pasword_reset, nickname, profile_picture, biography)
 VALUES
 ('TestCreator', '2000-01-01', 'test.creator@gmail.com', '1234_Aa', NULL, true, 4, NULL, 'testiFamouseBestii', NULL, 'Folgt meinem Linked In führ mehr guten Content (;')
 ;

SELECT name, nickname, name
FROM account 
JOIN "role" on role_id = id_role
;



-- |----- rezept machen ----- |

INSERT INTO recipe
 (title, thumbnail, main_image, cooking_video, resting_time_in_min, preparation_time_in_min, cooking_time_in_min, serving_amount, creator_account_id, when_sesonality, is_public)
 VALUES
 ('Matcha Cookies', '\\x89504e470d0a1a0a0000000d494844520000', NULL, NULL, 60, 20, 10, 16, 1, 'immer', true)
 ;

SELECT recipe, user_name
FROM recipe 
JOIN account on creator_account_id = id_account;
