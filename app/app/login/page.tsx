"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  useToast,
  Button,
  Input,
  Divider,
  FormLabel,
  Heading,
  Box,
} from "@chakra-ui/react";
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
      <Heading mb={4} fontSize="3xl" fontWeight="bold" letterSpacing="wide">
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5} textAlign="left">
          <FormLabel
            htmlFor="email"
            mb={2}
            fontWeight="medium"
            display="inline-block"
          >
            メールアドレス
          </FormLabel>
          <Input
            id="email"
            type="mail"
            placeholder="Mail"
            {...register("email", { required: true })}
          />
        </Box>
        <Box mb={5} textAlign="left">
          <FormLabel
            htmlFor="password"
            mb={2}
            fontWeight="medium"
            display="inline-block"
          >
            パスワード (6文字以上)
          </FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </Box>
        <Box mb={5}>
          <Button type="submit" colorScheme="blue" isDisabled={loading}>
            ログイン
          </Button>
        </Box>
        <Divider mb={5} borderColor="#E2E8F0" />
        <Box
          display={{ base: "block", md: "flex" }}
          gap={{ base: "0", md: "20px" }}
          justifyContent="center"
        >
          <Button
            variant="link"
            textDecoration="underline"
            fontWeight="medium"
            colorScheme="blue"
            mx={{ base: "auto", md: "inherit" }}
            mb={{ base: 2, md: "0px" }}
            display="block"
          >
            <Link href="/">ログインせずに利用する</Link>
          </Button>
          <Button
            variant="link"
            textDecoration="underline"
            fontWeight="medium"
            colorScheme="blue"
            mx={{ base: "auto", md: "inherit" }}
            display="block"
          >
            <Link href="/signup">サインアップする</Link>
          </Button>
        </Box>
      </form>
    </Contents>
  );
};

export default Login;
