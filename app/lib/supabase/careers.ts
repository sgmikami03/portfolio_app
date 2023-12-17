import supabase from "@/utils/supabase";

export const createCareers = async (
  profileId: string,
  name: string,
  occupation: string,
  start: Date,
  end: Date,
  text: string
) => {
  const { error } = await supabase.from("careers").insert({
    profiles_id: profileId,
    name: name,
    occupation: occupation,
    start: start,
    end: end,
    text: text,
  });

  if (error) {
    return { message: "ng", careers: [] };
  }

  const { data: careers } = await supabase
    .from("careers")
    .select("*")
    .eq("profiles_id", profileId);
  return { careers: careers || [], message: "ok" };
};
