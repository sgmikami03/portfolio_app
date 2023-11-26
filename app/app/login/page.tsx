"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Contents from "@/components/auth/contents";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

// ログイン
const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: { email: "", password: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      // ログイン
      const { error: errrorLogin } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      // エラーチェック
      if (errrorLogin) {
        setMessage("エラーが発生しました。" + errrorLogin.message);
        return;
      }

      // 入力フォームクリア
      reset();
      setMessage(
        "ログインが完了しました。"
      );
      redirect("/")
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <h1 className="mb-[20px] text-3xl font-bold tracking-wide">ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          メールアドレス:
          <input type="mail" {...register("email", { required: true })} />
        </p>
        <p>
          パスワード:
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </p>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button type="submit">ログイン</button>
          )}
        </div>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default Login;
