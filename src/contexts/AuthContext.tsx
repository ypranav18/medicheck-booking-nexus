
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
  lastSignUpAttempt: number | null;
  isRateLimited: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSignUpAttempt, setLastSignUpAttempt] = useState<number | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (event) {
          console.log('Supabase auth event:', event);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "Unable to sign in. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Check if we're currently rate limited
      if (isRateLimited) {
        const now = Date.now();
        const elapsedMinutes = lastSignUpAttempt ? (now - lastSignUpAttempt) / (1000 * 60) : 0;
        
        if (elapsedMinutes < 15) {
          const remainingMinutes = Math.ceil(15 - elapsedMinutes);
          toast({
            title: "Sign Up Limit Reached",
            description: `Please wait approximately ${remainingMinutes} more minute${remainingMinutes !== 1 ? 's' : ''} before trying again.`,
            variant: "destructive",
          });
          return { error: { message: "Rate limited. Please wait before trying again." } };
        } else {
          // Reset rate limit if enough time has passed
          setIsRateLimited(false);
        }
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: window.location.origin,
        }
      });

      if (error) {
        // Handle rate limiting error specifically
        if (error.code === 'over_email_send_rate_limit') {
          setIsRateLimited(true);
          setLastSignUpAttempt(Date.now());
          
          toast({
            title: "Sign Up Limit Reached",
            description: "Supabase has a limit on sign-ups from the same IP address. Please wait 15-30 minutes and try again, or try using a different network connection.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign up failed",
            description: error.message || "Unable to create account. Please try again.",
            variant: "destructive",
          });
        }
        return { error };
      }
      
      if (data.user) {
        toast({
          title: "Account created successfully!",
          description: "You have been signed in automatically.",
        });
        
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected error signing up:', error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
    });
  };

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut,
    loading,
    lastSignUpAttempt,
    isRateLimited
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
