-- Tables

create table public.profile (
  user_id			uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username		varchar NOT NULL UNIQUE,
  email			varchar NOT NULL UNIQUE,
  password		varchar NOT NULL,
  profile_status	profile_status DEFAULT 'normal' NOT NULL
);
create table public.form (
  id			uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name		varchar DEFAULT 'A form' NOT NULL,
  type		form_type NOT NULL,
  created_by	uuid NOT NULL,
  created_at	timestamp DEFAULT now() NOT NULL
);
create table public.form_question (
  form_id		uuid,
  question_num	int2,
  type		question_type NOT NULL,
  description	varchar DEFAULT 'A question' NOT NULL,
  options		json,

  FOREIGN KEY (form_id) REFERENCES public.form (id),
  PRIMARY KEY (form_id, question_num)
);
create table public.form_response (
  id				uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_num		uuid,
  form_id			uuid,
  user_id			uuid,
  freeform_answer	varchar,
  rate_answer		int2,
  mc_answer		int2,

  FOREIGN KEY (form_id) REFERENCES public.form (id),
  FOREIGN KEY (user_id) REFERENCES public.profile (user_id)
);

DROP TABLE public.form_response;
DROP TABLE public.form_question;
DROP TABLE public.form;
DROP TABLE public.profile;

-- Placeholder data

INSERT INTO profile (user_id, username, email, password, profile_status) VALUES ('d45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 'admin', 'admin@admin.com', 'admin', 'admin');
INSERT INTO profile (user_id, username, email, password) VALUES ('189684c2-569a-436e-8d25-47cf07449d11', 'hamala@karris.party', 'Hamala Karris', 'admin');
INSERT INTO profile (user_id, username, email, password) VALUES ('f18c9489-9dbd-4c28-ae5e-7af35e1dc308', 'tonald@drump.party', 'Tonald Drump', 'admin');

CREATE TYPE profile_status AS ENUM ('normal', 'admin');
CREATE TYPE form_type AS ENUM ('feedback', 'survey');
CREATE TYPE question_type AS ENUM ('freeform', 'rate', 'multiple_choice');

INSERT INTO form (name, type, created_by) VALUES ('Feedback Form', 'feedback', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2');
INSERT INTO form (name, type, created_by) VALUES ('A Poll', 'survey', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2');
INSERT INTO form (name, type, created_by) VALUES ('A Survey', 'survey', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2');

-- enums/types

CREATE TYPE profile_status AS ENUM ('normal', 'admin');
CREATE TYPE form_type AS ENUM ('feedback', 'survey');
CREATE TYPE question_type AS ENUM ('freeform', 'rate', 'multiple_choice');

DROP TYPE profile_status;
DROP TYPE form_type;
DROP TYPE question_type;
