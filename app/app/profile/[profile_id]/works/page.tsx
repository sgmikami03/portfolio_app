import { NextPage } from "next";
import { cookies } from "next/headers";
import { getProfileByIdWithCareer } from "@/lib/supabase/profiles";
import { Profile } from "@/type";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTab from "@/components/profile/ProfileTab";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type PageProps = {
  params: {
    profile_id: string;
  };
};

const ProfilePage: NextPage<PageProps> = async ({ params }) => {
  const profile_id: string = params.profile_id;
  const profile: Profile | null = await getProfileByIdWithCareer(profile_id);

  //ログインユーザーの取得
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isEdit = session?.user.id == profile?.id;

  return (
    <>
      <ProfileHeader profile={profile} isEdit />
      <ProfileTab profileId={profile_id} tabNum={1} />
      <p>ワークスコンポーネント</p>
    </>
  );
};

export default ProfilePage;
