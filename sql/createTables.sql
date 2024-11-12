create table public.profile (
  user_id			uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  other_db_id		varchar,
  username		varchar NOT NULL UNIQUE,
  password		varchar NOT NULL,
  profile_status	profile_status DEFAULT 'normal' NOT NULL
);
create table public.feedback (
  feedback_id		uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id			uuid,
  feedback_info	varchar NOT NULL,
  feedback_date	timestamp default now(),

  FOREIGN KEY (user_id) REFERENCES public.profile (user_id)
);
create table public.survey (
  survey_id	uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_name	varchar default 'A Survey' NOT NULL,
  questions	json NOT NULL
);
create table public.survey_res (
  survey_id	uuid,
  user_id		uuid,
  responses	json NOT NULL,

  FOREIGN KEY (survey_id) REFERENCES public.survey (survey_id),
  FOREIGN KEY (user_id) REFERENCES public.profile (user_id),
  PRIMARY KEY (survey_id, user_id)
);
create table public.poll (
  poll_id		uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_name	varchar default 'A Poll' NOT NULL,
  poll_text	varchar,
  poll_label_l	varchar default 'Disagree',
  poll_label_r	varchar default 'Agree',
  poll_min	int2 DEFAULT 1,
  poll_max	int2 DEFAULT 5
);
create table public.poll_res (
  poll_id			uuid,
  user_id			uuid,
  poll_response	int2 NOT NULL,

  FOREIGN KEY (poll_id) REFERENCES public.poll (poll_id),
  FOREIGN KEY (user_id) REFERENCES public.profile (user_id),
  PRIMARY KEY (poll_id, user_id)
);