"use client";

import { FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";
import Contents from "@/components/auth/contents";
import Link from "next/link";
import { Button, Divider, Box, useToast, Heading } from "@chakra-ui/react";

// サインアップ
const Logout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ログアウト
      const { error } = await supabase.auth.signOut();

      // エラーチェック
      if (error) {
        toast({
          title: "エラーが発生しました。",
          description: error.message,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      toast({
        title: "ログアウト完了",
        description: "ログアウトが完了しました。",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
      setLoading(false);
      router.push("/");

    } catch (error) {
      setLoading(false);
      toast({
        title: "エラーが発生しました。",
        description: String(error),
        status: "error",
        duration: 10000,
        isClosable: true,
      });
      return;
    }
  };

  return (
    <Contents>
      <Heading mb={4} fontSize="3xl" fontWeight="bold" letterSpacing="wide">
        Logout
      </Heading>
      <form onSubmit={onSubmit}>
        <Box mb={5}>
          <Button type="submit" colorScheme="red" isDisabled={loading}>
            ログアウト
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" gap={5}>
          <Button
            textDecoration="underline"
            fontWeight="medium"
            colorScheme="blue"
            variant="link"
          >
            <Link href="/">ログアウトせずに利用する</Link>
          </Button>
        </Box>
      </form>
    </Contents>
  );
};

export default Logout;
