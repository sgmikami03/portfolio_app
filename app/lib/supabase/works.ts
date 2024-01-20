import supabase from "@/utils/supabase";
import { Descendant } from "slate";
import { v4 as uuidv4 } from "uuid";

export const createWorks = async (
  work_id: string,
  profile_id: string,
  title: string,
  production: string,
  text: Descendant[] | undefined,
  thumbnail: string | null
) => {
  
  const { error } = await supabase.from("works").insert({
    id: work_id,
    profiles_id: profile_id,
    title: title,
    production: production,
    text: {data: text},
    thumbnail: thumbnail || null,
  });
  
  if (error) {
    return { message: "ng" };
  } else {
    return { message: "ok" };
  }
};

export const updateThumbnailImage = async (
  work_id: string,
  thumbnailImage: File,
  thumbnailImageUrl?: string
) => {
  // supabaseストレージに画像アップロード
  const { data: storageData, error: storageError } = await supabase.storage
    .from("works")
    .upload(`${work_id}/${uuidv4()}`, thumbnailImage);

  // エラーチェック
  if (storageError) {
    console.log(storageError);
    return null;
  }

  if (thumbnailImageUrl) {
    const fileName = thumbnailImageUrl.split("/").slice(-1)[0];

    // 古い画像を削除
    await supabase.storage.from("works").remove([`${work_id}/${fileName}`]);
  }

  // 画像のURLを取得
  const { data: urlData } = await supabase.storage
    .from("profiles")
    .getPublicUrl(storageData.path);

  const newIconImageUrl = urlData.publicUrl;
  return newIconImageUrl;
};
