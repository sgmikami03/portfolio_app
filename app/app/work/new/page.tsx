import WorkForm from "@/components/works/WorkForm";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import WorksCreateLayout from "@/components/works/WorksCreateLayout";

const WorkCreate: NextPage = async () => {
  //ログインユーザーの取得
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const profileId = session?.user.id;

  return (
    <WorksCreateLayout>
      <WorkForm profileId={profileId || ""} isNew={true} />
    </WorksCreateLayout>
  );
};

export default WorkCreate;
