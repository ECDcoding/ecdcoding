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

      // Create profile record using security definer functions (works before email confirmation)
      if (data.user) {
        // Insert basic profile data via security definer function
        const { error: profileError } = await supabase.rpc('create_user_profile', {
          _user_id: data.user.id,
          _first_name: userData.firstName,
          _last_name: userData.lastName,
          _username: userData.username,
          _state: userData.state,
          _country: userData.country,
          _registration_type: userData.registrationType,
          ...(userData.registrationType === 'parent' && {
            _institution: userData.institution || null,
            _registration_status: userData.registrationStatus || null,
            _hear_about: userData.hearAbout || null,
            _aspiration: userData.aspiration || null,
            _relationship: userData.relationship || null,
          }),
          ...(userData.registrationType === 'ecd-manager' && {
            _current_programs: userData.currentPrograms || null,
            _tech_goals: userData.techGoals || null,
          }),
          ...(userData.registrationType === 'tech-teacher' && {
            _qualifications: userData.qualifications || null,
            _experience: userData.experience || null,
            _tech_skills: userData.techSkills || null,
            _programming_languages: userData.programmingLanguages || null,
            _teaching_philosophy: userData.teachingPhilosophy || null,
            _available_hours: userData.availableHours || null,
            _salary: userData.salary || null,
            _start_date: userData.startDate || null,
          }),
        });

        if (profileError) throw profileError;

        // Insert sensitive profile data via security definer function
        const phone = userData.phone1 ? `${userData.phone1}-${userData.phone2}-${userData.phone3}` : null;
        
        const sensitiveParams: any = {
          _user_id: data.user.id,
          _phone: phone,
        };

        if (userData.registrationType === 'parent') {
          sensitiveParams._number_of_kids = userData.numberOfKids || null;
          sensitiveParams._learner_first_name = userData.learnerFirstName || null;
          sensitiveParams._learner_last_name = userData.learnerLastName || null;
          sensitiveParams._learner_gender = userData.learnerGender || null;
          sensitiveParams._ecd_phone = userData.ecdPhone1 ? `${userData.ecdPhone1}-${userData.ecdPhone2}-${userData.ecdPhone3}` : null;
          sensitiveParams._ecd_email = userData.ecdEmail || null;
        } else if (userData.registrationType === 'ecd-manager') {
          sensitiveParams._facility_name = userData.facilityName || null;
          sensitiveParams._facility_type = userData.facilityType || null;
          sensitiveParams._number_of_learners = userData.numberOfLearners || null;
          sensitiveParams._age_groups = userData.ageGroups || null;
          sensitiveParams._ecd_phone = userData.ecdPhone1 ? `${userData.ecdPhone1}-${userData.ecdPhone2}-${userData.ecdPhone3}` : null;
          sensitiveParams._ecd_email = userData.ecdEmail || null;
        }

        const { error: sensitiveError } = await supabase.rpc('create_user_sensitive_data', sensitiveParams);

        if (sensitiveError) throw sensitiveError;
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
      // Use local scope: revoking server-side fails when the session is
      // already expired/missing, which surfaced as "Auth session missing".
      const { error } = await supabase.auth.signOut({ scope: 'local' });

      // Treat a missing session as a successful sign-out.
      const isMissingSession =
        error &&
        (error.name === 'AuthSessionMissingError' ||
          /session (missing|not found)/i.test(error.message));

      if (error && !isMissingSession) throw error;

      // Make sure nothing stale is left behind in this tab.
      setSession(null);
      setUser(null);

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      setSession(null);
      setUser(null);
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

  const completeProfile = async (userData: any) => {
    if (!user) {
      return { error: new Error('Not authenticated') };
    }
    try {
      const { error: profileError } = await supabase.rpc('create_user_profile', {
        _user_id: user.id,
        _first_name: userData.firstName,
        _last_name: userData.lastName,
        _username: userData.username,
        _state: userData.state,
        _country: userData.country,
        _registration_type: userData.registrationType,
        ...(userData.registrationType === 'parent' && {
          _institution: userData.institution || null,
          _registration_status: userData.registrationStatus || null,
          _hear_about: userData.hearAbout || null,
          _aspiration: userData.aspiration || null,
          _relationship: userData.relationship || null,
        }),
        ...(userData.registrationType === 'ecd-manager' && {
          _current_programs: userData.currentPrograms || null,
          _tech_goals: userData.techGoals || null,
        }),
        ...(userData.registrationType === 'tech-teacher' && {
          _qualifications: userData.qualifications || null,
          _experience: userData.experience || null,
          _tech_skills: userData.techSkills || null,
          _programming_languages: userData.programmingLanguages || null,
          _teaching_philosophy: userData.teachingPhilosophy || null,
          _available_hours: userData.availableHours || null,
          _salary: userData.salary || null,
          _start_date: userData.startDate || null,
        }),
      });
      if (profileError) throw profileError;

      const phone = userData.phone1 ? `${userData.phone1}-${userData.phone2}-${userData.phone3}` : null;
      const sensitiveParams: any = { _user_id: user.id, _phone: phone };
      if (userData.registrationType === 'parent') {
        sensitiveParams._number_of_kids = userData.numberOfKids || null;
        sensitiveParams._learner_first_name = userData.learnerFirstName || null;
        sensitiveParams._learner_last_name = userData.learnerLastName || null;
        sensitiveParams._learner_gender = userData.learnerGender || null;
        sensitiveParams._ecd_phone = userData.ecdPhone1 ? `${userData.ecdPhone1}-${userData.ecdPhone2}-${userData.ecdPhone3}` : null;
        sensitiveParams._ecd_email = userData.ecdEmail || null;
      } else if (userData.registrationType === 'ecd-manager') {
        sensitiveParams._facility_name = userData.facilityName || null;
        sensitiveParams._facility_type = userData.facilityType || null;
        sensitiveParams._number_of_learners = userData.numberOfLearners || null;
        sensitiveParams._age_groups = userData.ageGroups || null;
        sensitiveParams._ecd_phone = userData.ecdPhone1 ? `${userData.ecdPhone1}-${userData.ecdPhone2}-${userData.ecdPhone3}` : null;
        sensitiveParams._ecd_email = userData.ecdEmail || null;
      }
      const { error: sensitiveError } = await supabase.rpc('create_user_sensitive_data', sensitiveParams);
      if (sensitiveError) throw sensitiveError;

      toast({ title: 'Welcome!', description: 'Your profile is set up. Enjoy your free trial.' });
      return { error: null };
    } catch (error: any) {
      toast({ title: 'Profile setup failed', description: error.message, variant: 'destructive' });
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
    completeProfile,
  };
};