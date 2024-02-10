import WorkForm from "@/components/works/WorkForm";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import WorksCreateLayout from "@/components/works/WorksCreateLayout";
import { redirect } from "next/navigation";
import { getWorksByIdWithProfiles } from "@/lib/supabase/works";

type PageProps = {
  params: {
    work_id: string;
  };
};

const WorkEdit: NextPage<PageProps> = async ({ params: { work_id } }) => {
  //ログインユーザーの取得
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const profileId = session?.user.id;

  const works = await getWorksByIdWithProfiles(work_id);

  //TODO: works.profiles.id == user.id でないなら "/"にリダイレクトする。
  if (!profileId) {
    redirect("/404");
  }
  if (!works?.id) {
    redirect("/404");
  }
  if (!(works?.profiles?.id === profileId)) {
    redirect("/404");
  }

  return (
    <WorksCreateLayout>
      <WorkForm profileId={profileId} isNew={false} work={works} />
    </WorksCreateLayout>
  );
};

export default WorkEdit;
