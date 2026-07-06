import { createClient } from "./client";

/** Extracts a readable message from any error shape (Error, PostgrestError, AuthError, etc.) */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (typeof err.message === "string") return err.message;
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }
  return String(error);
}

export interface ChatRow {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface MessageRow {
  id: string;
  chat_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

/** Create a new chat owned by the current user. Returns the created chat. */
export async function createChat(title = "New Chat") {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("You must be signed in to create a chat.");
  }

  const { data, error } = await supabase
    .from("chats")
    .insert({ user_id: userData.user.id, title })
    .select()
    .single();

  if (error) throw error;
  return data as ChatRow;
}

/** List all chats owned by the current user, most recently updated first. */
export async function listChats() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as ChatRow[];
}

/** Fetch a single chat by id. RLS ensures only the owner can read it. */
export async function getChat(chatId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .maybeSingle();

  if (error) throw error;
  return data as ChatRow | null;
}

/** Delete a chat (and its messages, via cascade) owned by the current user. */
export async function deleteChat(chatId: string) {
  const supabase = createClient();
  const { error } = await supabase.from("chats").delete().eq("id", chatId);
  if (error) throw error;
}

/** Update a chat's title. */
export async function updateChatTitle(chatId: string, title: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("chats")
    .update({ title })
    .eq("id", chatId);
  if (error) throw error;
}

/** List messages for a chat, oldest first. */
export async function listMessages(chatId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as MessageRow[];
}

/** Append a message to a chat. */
export async function addMessage(
  chatId: string,
  role: MessageRow["role"],
  content: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({ chat_id: chatId, role, content })
    .select()
    .single();

  if (error) throw error;

  // Bump the chat's updated_at so it sorts to the top of the list.
  await supabase
    .from("chats")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", chatId);

  return data as MessageRow;
}
