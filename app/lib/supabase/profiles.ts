import supabase from "@/utils/supabase";

export const getProfileById: any | null = async (id: string) => {
    const {data: profile } = await supabase.from("profiles").select().eq("id", id).single();
    return profile;
};