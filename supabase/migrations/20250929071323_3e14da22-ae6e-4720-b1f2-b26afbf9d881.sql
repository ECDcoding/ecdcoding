-- Create a table for user profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  username TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  registration_type TEXT NOT NULL CHECK (registration_type IN ('parent', 'ecd-manager', 'tech-teacher')),
  -- Parent specific fields
  institution TEXT,
  registration_status TEXT,
  number_of_kids TEXT,
  hear_about TEXT,
  aspiration TEXT,
  learner_first_name TEXT,
  learner_last_name TEXT,
  relationship TEXT,
  ecd_phone TEXT,
  ecd_email TEXT,
  -- ECD Manager specific fields
  facility_name TEXT,
  facility_type TEXT,
  number_of_learners TEXT,
  age_groups TEXT,
  current_programs TEXT,
  tech_goals TEXT,
  -- Tech Teacher specific fields
  qualifications TEXT,
  experience TEXT,
  tech_skills TEXT,
  programming_languages TEXT,
  teaching_philosophy TEXT,
  available_hours TEXT,
  salary TEXT,
  start_date TEXT
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();