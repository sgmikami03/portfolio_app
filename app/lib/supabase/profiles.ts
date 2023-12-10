import supabase from "@/utils/supabase";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from 'uuid';

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
      `id, name, occupation, icon_image, careers(id, name, text, occupation, start, end)`
    )
    .eq("id", id)
    .single();
  return profile;
};

export const updateProfile = async (
  id: string,
  name: string,
  occupation: string,
  icon_image: string | null
) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      name: name,
      occupation: occupation,
      icon_image: icon_image,
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

export const updateProfileIcon = async (
  profile_id: string,
  iconImage: File,
  iconImageUrl?: string
) => {
  // supabaseストレージに画像アップロード
  const { data: storageData, error: storageError } = await supabase.storage
    .from("profiles")
    .upload(`${profile_id}/${uuidv4()}`, iconImage);

  // エラーチェック
  if (storageError) {
    console.log(storageError);
    return;
  }

  if (iconImageUrl) {
    const fileName = iconImageUrl.split("/").slice(-1)[0];

    // 古い画像を削除
    await supabase.storage
      .from("profiles")
      .remove([`${profile_id}/${fileName}`]);
  }

  // 画像のURLを取得
  const { data: urlData } = await supabase.storage
    .from("profiles")
    .getPublicUrl(storageData.path);

  const newIconImageUrl = urlData.publicUrl;
  return newIconImageUrl;
};
