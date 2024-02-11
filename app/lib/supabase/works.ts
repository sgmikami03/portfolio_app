import { Work } from "@/type";
import supabase from "@/utils/supabase";
import { Descendant } from "slate";
import { v4 as uuidv4 } from "uuid";
import { unstable_noStore as noStore } from "next/cache";

export const countWorks = async (): Promise<number> => {
  noStore();
  const { count } = await supabase
    .from("works")
    .select("*", { count: "exact", head: true });

  if (count === null) {
    return 0;
  }

  return count;
};

export const getWorksWithLimitWithProfiles = async (
  limit: number,
  skip: number
): Promise<Work[] | null> => {
  noStore();
  const { data: works } = await supabase
    .from("works")
    .select(
      `id, profiles_id, production, create_at, text, title, thumbnail, profiles(id, name, icon_image, occupation)`
    )
    .order("create_at", { ascending: false })
    .range(skip, skip + limit - 1)
    .limit(limit);

  if (!works) {
    return null;
  }

  return works as unknown as Work[];
};

export const getWorksByIdWithProfiles = async (
  id: string
): Promise<Work | null> => {
  noStore();
  const { data: works } = await supabase
    .from("works")
    .select(
      `id, profiles_id, production, create_at, text, title, thumbnail, profiles(id, name, icon_image, occupation)`
    )
    .eq("id", id)
    .single();

  if (!works) {
    return null;
  }

  return works as unknown as Work;
};

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
    text: { data: text },
    thumbnail: thumbnail || null,
  });

  if (error) {
    return { message: "ng" };
  } else {
    return { message: "ok" };
  }
};

export const updateWorks = async (
  work_id: string,
  profile_id: string,
  title: string,
  production: string,
  text: Descendant[] | undefined,
  thumbnail: string | null
) => {
  const { error } = await supabase
    .from("works")
    .update({
      profiles_id: profile_id,
      title: title,
      production: production,
      text: { data: text },
      thumbnail: thumbnail || null,
    })
    .eq("id", work_id);

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
    .from("works")
    .getPublicUrl(storageData.path);

  const newIconImageUrl = urlData.publicUrl;
  return newIconImageUrl;
};
