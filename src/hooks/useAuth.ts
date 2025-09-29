import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: userData.username,
            first_name: userData.firstName,
            last_name: userData.lastName,
          }
        }
      });

      if (error) throw error;

      // Create profile record
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
            username: userData.username,
            phone: `${userData.phone1}-${userData.phone2}-${userData.phone3}`,
            state: userData.state,
            country: userData.country,
            registration_type: userData.registrationType,
            // Add type-specific fields based on registration type
            ...(userData.registrationType === 'parent' && {
              institution: userData.institution,
              registration_status: userData.registrationStatus,
              number_of_kids: userData.numberOfKids,
              hear_about: userData.hearAbout,
              aspiration: userData.aspiration,
              learner_first_name: userData.learnerFirstName,
              learner_last_name: userData.learnerLastName,
              relationship: userData.relationship,
              ecd_phone: userData.ecdPhone1 ? `${userData.ecdPhone1}-${userData.ecdPhone2}-${userData.ecdPhone3}` : null,
              ecd_email: userData.ecdEmail,
            }),
            ...(userData.registrationType === 'ecd-manager' && {
              facility_name: userData.facilityName,
              facility_type: userData.facilityType,
              number_of_learners: userData.numberOfLearners,
              age_groups: userData.ageGroups,
              current_programs: userData.currentPrograms,
              tech_goals: userData.techGoals,
            }),
            ...(userData.registrationType === 'tech-teacher' && {
              qualifications: userData.qualifications,
              experience: userData.experience,
              tech_skills: userData.techSkills,
              programming_languages: userData.programmingLanguages,
              teaching_philosophy: userData.teachingPhilosophy,
              available_hours: userData.availableHours,
              salary: userData.salary,
              start_date: userData.startDate,
            }),
          });

        if (profileError) throw profileError;
      }

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'facebook') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "OAuth sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    resetPassword,
  };
};