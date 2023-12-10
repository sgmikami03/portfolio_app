import { Profile } from "@/type";
import supabase from "@/utils/supabase";

export const getProfileById: any | null = async (id: string) => {
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single();
  return profile;
};

export const getProfileByIdWithCareer: any | null = async (id: string) => {
  const { data: profile } = await supabase
    .from("profiles")
    .select(
      `id, name, occupation, careers(id, name, text, occupation, start, end)`
    )
    .eq("id", id)
    .single();
  return profile;
};

export const updateProfile = async (
  id: string,
  name: string,
  occupation: string
) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      name: name,
      occupation: occupation,
    })
    .eq("id", id);
  if (error) {
    return { message: "ng" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single();
  return { profile: profile, message: "ok" };
};
