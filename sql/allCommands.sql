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
  created_at	timestamp DEFAULT now() NOT NULL,
  points		int2 DEFAULT 1 NOT NULL
);
create table public.form_question (
  form_id		uuid,
  question_num	int2,
  type		question_type NOT NULL,
  description	varchar DEFAULT 'A question' NOT NULL,
  options		json,

  FOREIGN KEY (form_id) REFERENCES public.form (id),
  PRIMARY KEY (form_id, question_num),
  CONSTRAINT has_options CHECK (type <> 'multiple_choice' OR options IS NOT NULL)
);
create table public.form_response (
  id				uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_num		int2 NOT NULL,
  form_id			uuid NOT NULL,
  user_id			uuid NOT NULL,
  freeform_answer	varchar,
  rate_answer		int2,
  mc_answer		varchar,

  FOREIGN KEY (form_id) REFERENCES public.form (id),
  FOREIGN KEY (user_id) REFERENCES public.profile (user_id),
  CONSTRAINT provided_answer CHECK (freeform_answer IS NOT NULL OR rate_answer IS NOT NULL OR mc_answer IS NOT NULL),
  CONSTRAINT valid_rating CHECK (1 <= rate_answer AND rate_answer <= 5)
);
create table public.training_session (
  id			uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title		varchar NOT NULL DEFAULT 'A Training Session',
  description	varchar,
  points		int2 NOT NULL DEFAULT 1
);
create table public.attendance (
  training_id	uuid,
  user_id		uuid,

  FOREIGN KEY (training_id) REFERENCES public.training_session (id),
  FOREIGN KEY (user_id) REFERENCES public.profile (user_id),
  PRIMARY KEY (training_id, user_id)
);

-- Placeholder data

INSERT INTO profile (user_id, username, email, password, profile_status) VALUES ('d45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 'admin', 'admin@admin.com', 'admin', 'admin');
INSERT INTO profile (user_id, username, email, password) VALUES ('189684c2-569a-436e-8d25-47cf07449d11', 'Hamala Karris', 'hamala@karris.party', 'admin');
INSERT INTO profile (user_id, username, email, password) VALUES ('f18c9489-9dbd-4c28-ae5e-7af35e1dc308', 'Tonald Drump', 'tonald@drump.party', 'admin');

INSERT INTO form (id, name, type, created_by, points) VALUES ('20c1200f-cc03-4b80-9349-f19f6e826d03', 'Feedback Form', 'feedback', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 10);
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('20c1200f-cc03-4b80-9349-f19f6e826d03', 1, 'freeform', 'Is there any sort of feedback you want to give us?');

INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES (1, '20c1200f-cc03-4b80-9349-f19f6e826d03', '189684c2-569a-436e-8d25-47cf07449d11', 'Great system! I think more frequent seasonal offers would be better.');

INSERT INTO form (id, name, type, created_by, points) VALUES ('a04c1d1b-f4fd-4dc7-ab39-86a83a3b70aa', 'A Poll', 'survey', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 20);
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('a04c1d1b-f4fd-4dc7-ab39-86a83a3b70aa', 1, 'rate', 'Let us know how satisfied you are with the recent exclusive FleetRewards offers.');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('a04c1d1b-f4fd-4dc7-ab39-86a83a3b70aa', 2, 'freeform', 'Any additional comments?');

INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES (1, 'a04c1d1b-f4fd-4dc7-ab39-86a83a3b70aa', '189684c2-569a-436e-8d25-47cf07449d11', 5);
INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES (1, 'a04c1d1b-f4fd-4dc7-ab39-86a83a3b70aa', '189684c2-569a-436e-8d25-47cf07449d11', 'None. Great job!');

INSERT INTO form (id, name, type, created_by, points) VALUES ('38c09435-975e-47c7-bb97-ab072c326764', 'A Survey', 'survey', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 50);
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('38c09435-975e-47c7-bb97-ab072c326764', 1, 'multiple_choice', 'Overall, Vehicular Services Inc. meets all your fleet''s needs.', '["Yes", "No"]');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('38c09435-975e-47c7-bb97-ab072c326764', 2, 'multiple_choice', 'Vehicular Services Inc.''s products are helpful to your fleet.', '["Agree", "Neither", "Disagree"]');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('38c09435-975e-47c7-bb97-ab072c326764', 3, 'multiple_choice', 'Vehicular Services Inc.''s services are helpful to your fleet.', '["True", "False"]');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('38c09435-975e-47c7-bb97-ab072c326764', 4, 'multiple_choice', 'Vehicular Services Inc.''s FleetRewards loyalty program is useful.', '["Strongly Agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly Disagree"]');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('38c09435-975e-47c7-bb97-ab072c326764', 5, 'freeform', 'Enter any additional comments you have for us (Vehicular Services Inc. or the FleetRewards program).');

INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES (1, '38c09435-975e-47c7-bb97-ab072c326764', '189684c2-569a-436e-8d25-47cf07449d11', 'Yes');
INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES (2, '38c09435-975e-47c7-bb97-ab072c326764', '189684c2-569a-436e-8d25-47cf07449d11', 'Neither');
INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES (3, '38c09435-975e-47c7-bb97-ab072c326764', '189684c2-569a-436e-8d25-47cf07449d11', 'True');
INSERT INTO form_response (question_num, form_id, user_id, mc_answer) VALUES (4, '38c09435-975e-47c7-bb97-ab072c326764', '189684c2-569a-436e-8d25-47cf07449d11', 'Strongly Agree');
INSERT INTO form_response (question_num, form_id, user_id, freeform_answer) VALUES (5, '38c09435-975e-47c7-bb97-ab072c326764', '189684c2-569a-436e-8d25-47cf07449d11', 'N/A');

-- All types of questions

INSERT INTO form (id, name, type, created_by, points) VALUES ('fc37027b-69bc-4dcf-b30d-a963dca54f13', 'Comprehensive Form (Survey)', 'survey', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 101);
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('fc37027b-69bc-4dcf-b30d-a963dca54f13', 1, 'multiple_choice', 'Vehicular Services Inc.''s FleetRewards loyalty program is useful.', '["Strongly Agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly Disagree"]');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('fc37027b-69bc-4dcf-b30d-a963dca54f13', 2, 'freeform', 'Enter any additional comments you have for us (Vehicular Services Inc. or the FleetRewards program).');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('fc37027b-69bc-4dcf-b30d-a963dca54f13', 3, 'rate', 'Give us a rating on how satisfied you are with FleetRewards!');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('fc37027b-69bc-4dcf-b30d-a963dca54f13', 4, 'multiple_choice', 'Vehicular Services Inc.''s FleetRewards loyalty program is useful.', '["Yes", "No"]');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('fc37027b-69bc-4dcf-b30d-a963dca54f13', 5, 'freeform', 'Anything else?');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('fc37027b-69bc-4dcf-b30d-a963dca54f13', 6, 'rate', 'How are you today?');
INSERT INTO form (id, name, type, created_by, points) VALUES ('89c93f6f-d57f-401f-bbb1-f8e8eda67352', 'Comprehensive Form (Poll)', 'survey', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 103);
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('89c93f6f-d57f-401f-bbb1-f8e8eda67352', 1, 'rate', 'Give us a rating on how satisfied you are with FleetRewards!');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('89c93f6f-d57f-401f-bbb1-f8e8eda67352', 2, 'multiple_choice', 'Vehicular Services Inc.''s FleetRewards loyalty program is useful.', '["Strongly Agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly Disagree"]');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('89c93f6f-d57f-401f-bbb1-f8e8eda67352', 3, 'freeform', 'Enter any additional comments you have for us (Vehicular Services Inc. or the FleetRewards program).');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('89c93f6f-d57f-401f-bbb1-f8e8eda67352', 4, 'freeform', 'Anything else?');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('89c93f6f-d57f-401f-bbb1-f8e8eda67352', 5, 'rate', 'How are you today?');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('89c93f6f-d57f-401f-bbb1-f8e8eda67352', 6, 'multiple_choice', 'Vehicular Services Inc.''s FleetRewards loyalty program is useful.', '["Yes", "No"]');
INSERT INTO form (id, name, type, created_by, points) VALUES ('3c334487-0b3e-4daf-b6e9-4093087fda7e', 'Comprehensive Form (Feedback)', 'survey', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2', 102);
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('3c334487-0b3e-4daf-b6e9-4093087fda7e', 1, 'freeform', 'Enter any additional comments you have for us (Vehicular Services Inc. or the FleetRewards program).');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('3c334487-0b3e-4daf-b6e9-4093087fda7e', 2, 'multiple_choice', 'Vehicular Services Inc.''s FleetRewards loyalty program is useful.', '["Strongly Agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly Disagree"]');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('3c334487-0b3e-4daf-b6e9-4093087fda7e', 3, 'rate', 'Give us a rating on how satisfied you are with FleetRewards!');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('3c334487-0b3e-4daf-b6e9-4093087fda7e', 6, 'rate', 'How are you today?');
INSERT INTO form_question (form_id, question_num, type, description) VALUES ('3c334487-0b3e-4daf-b6e9-4093087fda7e', 5, 'freeform', 'Anything else?');
INSERT INTO form_question (form_id, question_num, type, description, options) VALUES ('3c334487-0b3e-4daf-b6e9-4093087fda7e', 4, 'multiple_choice', 'Vehicular Services Inc.''s FleetRewards loyalty program is useful.', '["Yes", "No"]');

INSERT INTO training_session (id, title, description, points) VALUES ('0a736891-01d6-4c00-afed-8cb32550f29d', 'Getting Started in VN Inc.', 'The first video to get you started!', 10);

INSERT INTO attendance (training_id, user_id) VALUES ('0a736891-01d6-4c00-afed-8cb32550f29d', 'd45a0d11-acb0-43cc-b20b-e2ab8c1444e2');
INSERT INTO attendance (training_id, user_id) VALUES ('0a736891-01d6-4c00-afed-8cb32550f29d', '189684c2-569a-436e-8d25-47cf07449d11');

-- enums/types

CREATE TYPE profile_status AS ENUM ('normal', 'admin');
CREATE TYPE form_type AS ENUM ('feedback', 'survey');
CREATE TYPE question_type AS ENUM ('freeform', 'rate', 'multiple_choice');

DROP TYPE profile_status;
DROP TYPE form_type;
DROP TYPE question_type;

-- Drop Tables

DROP TABLE public.attendance;
DROP TABLE public.training_session;
DROP TABLE public.form_response;
DROP TABLE public.form_question;
DROP TABLE public.form;
DROP TABLE public.profile;
