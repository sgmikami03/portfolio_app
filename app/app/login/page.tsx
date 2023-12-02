"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Input, Button, useToast } from "@chakra-ui/react";
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
  const toast = useToast();

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
        toast({
          title: "エラーが発生しました。",
          description: errrorLogin.message,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
        return;
      }

      // 入力フォームクリア
      reset();
      toast({
        title: "ログイン完了",
        description: "ログインが完了しました",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
      redirect("/");
    } catch (error) {
      toast({
        title: "エラーが発生しました。",
        description: String(error),
        status: "error",
        duration: 10000,
        isClosable: true,
      });
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Contents>
      <h1 className="mb-[20px] text-3xl font-bold tracking-wide">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-[15px] text-left">
          <label htmlFor="email" className="mb-[5px] font-medium inline-block">
            メールアドレス
          </label>
          <Input
            id="email"
            type="mail"
            placeholder="Mail"
            {...register("email", { required: true })}
          />
        </p>
        <p className="mb-[15px] text-left">
          <label
            htmlFor="password"
            className="mb-[5px] font-medium inline-block"
          >
            パスワード (6文字以上)
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </p>
        <div className="mb-[20px]">
          <Button type="submit" colorScheme="blue" isDisabled={loading}>
            ログイン
          </Button>
        </div>
        <hr className="mb-[20px] color-[#E2E8F0]" />
        <div className="flex justify-center gap-[20px]">
          <Link href="/" className="text-app-main underline font-medium">
            ログインせずに利用する
          </Link>
          <Link href="/signup" className="text-app-main underline font-medium">
            サインアップはこちら
          </Link>
        </div>
      </form>
    </Contents>
  );
};

export default Login;
