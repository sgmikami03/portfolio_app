"use client";

import { FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";
import Contents from "@/components/auth/contents";
import Link from "next/link";
import { Button, useToast } from "@chakra-ui/react";

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
        return;
      }

      router.push("/");
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
      toast({
        title: "ログアウト完了",
        description: "ログアウトが完了しました。",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Contents>
      <h1 className="mb-[20px] text-3xl font-bold tracking-wide">Logout</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-[20px]">
          <Button type="submit" colorScheme="red" isDisabled={loading}>
            ログアウト
          </Button>
        </div>
        <hr className="mb-[20px] color-[#E2E8F0]" />
        <div className="flex justify-center gap-[20px]">
          <Link href="/" className="text-app-main underline font-medium">
            ログアウトせずに利用する
          </Link>
        </div>
      </form>
    </Contents>
  );
};

export default Logout;
