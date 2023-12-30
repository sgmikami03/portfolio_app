import { NextPage } from "next";
import { cookies } from "next/headers";
import { getProfileByIdWithWork } from "@/lib/supabase/profiles";
import { Profile } from "@/type";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTab from "@/components/profile/ProfileTab";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import WorkCards from "@/components/works/WorksCards";

type PageProps = {
  params: {
    profile_id: string;
  };
};

const ProfilePage: NextPage<PageProps> = async ({ params }) => {
  const profile_id: string = params.profile_id;
  const profile: Profile | null = await getProfileByIdWithWork(profile_id);

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
      <ProfileHeader profile={profile} isEdit={isEdit} />
      <ProfileTab profileId={profile_id} tabNum={1} />
      <WorkCards works={profile?.works ?? []} isEdit={isEdit} profile={profile} />
    </>
  );
};

export default ProfilePage;
