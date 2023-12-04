import { NextPage } from "next";
import { getProfileByIdWithCareer } from "@/lib/supabase/profiles";
import { Profile } from "@/type";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTab from "@/components/profile/ProfileTab";
import ProfileCareers from "@/components/profile/ProfileCareers";

type PageProps = {
  params: {
    profile_id: string;
  };
};

const ProfilePage: NextPage<PageProps> = async ({ params }) => {
  const profile_id: string = params.profile_id;
  const profile: Profile | null = await getProfileByIdWithCareer(profile_id);

  return (
    <>
      <ProfileHeader profile={profile} />
      <ProfileTab profileId={profile_id} tabNum={0} />
      <ProfileCareers careers={profile?.careers ?? []} />
    </>
  );
};

export default ProfilePage;
