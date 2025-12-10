import { supabase } from "./supabase";

export interface AuthUser {
  id: string;
  email: string;
  type: string;
  last_login?: string;
}

export const createUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from("authorized_users")
      .insert([{ email: email.trim(), password }])
      .select();

    if (error) {
      console.error("Error creating user:", error);
      return { success: false, error: error.message };
    }

    console.log("User created successfully:", data);
    return { success: true };
  } catch (error) {
    console.error("Unexpected error creating user:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
  try {
    const trimmedEmail = email.trim();

    // Validate input
    if (!trimmedEmail || !password) {
      return { success: false, error: "Email and password are required" };
    }

    console.log("Attempting login with:", {
      originalEmail: email,
      trimmedEmail,
      password,
    });

    // Query the authorized_users table
    const { data: users, error } = await supabase
      .from("authorized_users")
      .select("*")
      .eq("email", trimmedEmail)
      .eq("password", password)
      .limit(1);

    console.log("Database query result:", {
      users,
      error,
      queryEmail: trimmedEmail,
    });

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: error.message };
    }

    if (!users || users.length === 0) {
      console.log("No user found with email:", trimmedEmail);
      return { success: false, error: "Invalid email or password" };
    }

    const user = users[0];

    // Double-check password match (extra security)
    if (user.password !== password) {
      return { success: false, error: "Invalid email or password" };
    }

    console.log("User found:", { id: user.id, email: user.email });

    // Update last login
    const { error: updateError } = await supabase
      .from("authorized_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    if (updateError) {
      console.warn("Failed to update last login:", updateError);
    }

    const authUser = {
      id: user.id,
      email: user.email,
      type: user.type,
      last_login: new Date().toISOString(),
    };

    // Store session in localStorage
    const session = {
      user: authUser,
      timestamp: Date.now(),
    };
    localStorage.setItem("arteno_user_session", JSON.stringify(session));

    return {
      success: true,
      user: authUser,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const signOut = async (): Promise<void> => {
  // Clear the stored session
  localStorage.removeItem("arteno_user_session");
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const storedSession = localStorage.getItem("arteno_user_session");
    if (!storedSession) {
      return null;
    }

    const session = JSON.parse(storedSession);

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - session.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (sessionAge > maxAge) {
      localStorage.removeItem("arteno_user_session");
      return null;
    }

    // Refresh user data from database to get latest type and other info
    const { data: userData, error } = await supabase
      .from("authorized_users")
      .select("id, email, type, last_login")
      .eq("id", session.user.id)
      .maybeSingle();

    if (error || !userData) {
      console.error("Error refreshing user data:", error);
      localStorage.removeItem("arteno_user_session");
      return null;
    }

    // Update session with latest user data
    const updatedUser: AuthUser = {
      id: userData.id,
      email: userData.email,
      type: userData.type,
      last_login: userData.last_login,
    };

    const updatedSession = {
      user: updatedUser,
      timestamp: session.timestamp,
    };
    localStorage.setItem("arteno_user_session", JSON.stringify(updatedSession));

    return updatedUser;
  } catch (error) {
    console.error("Error retrieving session:", error);
    localStorage.removeItem("arteno_user_session");
    return null;
  }
};
