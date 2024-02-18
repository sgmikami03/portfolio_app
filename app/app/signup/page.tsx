"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  Input,
  Button,
  Box,
  Divider,
  Heading,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import Contents from "@/components/auth/contents";
import CustomToast from "@/components/common/CustomToast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

// サインアップ
const Signup = () => {
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
    defaultValues: { name: "", email: "", password: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      // サインアップ
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      // エラーチェック
      if (errorSignup) {
        toast({
          duration: 10000,
          isClosable: true,
          render: () => (
            <CustomToast
              title="エラーが発生しました"
              text={errorSignup.message}
              status="error"
            />
          ),
        });
        return;
      }

      // プロフィールの名前を更新
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ name: data.name })
        .eq("email", data.email);

      // エラーチェック
      if (updateError) {
        toast({
          duration: 10000,
          isClosable: true,
          render: () => (
            <CustomToast
              title="エラーが発生しました"
              text={updateError.message}
              status="error"
            />
          ),
        });
        return;
      }

      // 入力フォームクリア
      reset();
      toast({
        duration: 10000,
        isClosable: true,
        render: () => (
          <CustomToast
            title="メール認証を行なってください"
            text={`本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。\n
              ※ テスト環境のため、メールが送信されずそのまま本登録されています。`}
            status="success"
          />
        ),
      });
    } catch (error) {
      toast({
        duration: 10000,
        isClosable: true,
        render: () => (
          <CustomToast
            title="エラーが発生しました"
            text={String(error)}
            status="error"
          />
        ),
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
        Signin
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5} textAlign="left">
          <FormLabel
            htmlFor="name"
            mb={2}
            fontWeight="medium"
            display="inline-block"
          >
            表示名 (2文字以上)
          </FormLabel>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </Box>
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
            サインアップ
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
            <Link href="/login">ログインする</Link>
          </Button>
        </Box>
      </form>
    </Contents>
  );
};

export default Signup;
