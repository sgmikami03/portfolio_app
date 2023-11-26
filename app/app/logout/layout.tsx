import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import type { Database } from "@/lib/database.types";

const Signup = async ({ children }: { children: React.ReactNode }) => {
  //ログインしているかどうか監視して、リダイレクト (してない場合は "/" にリダイレクト)
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default Signup;
