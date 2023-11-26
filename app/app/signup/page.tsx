"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
    name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
    email: z
        .string()
        .email({ message: "メールアドレスの形式ではありません。" }),
    password: z
        .string()
        .min(6, { message: "6文字以上入力する必要があります。" }),
});

// サインアップ
const Signup = () => {
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
                setMessage("エラーが発生しました。" + errorSignup.message);
                return;
            }

            // プロフィールの名前を更新
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ name: data.name })
                .eq("email", data.email);

            // エラーチェック
            if (updateError) {
                setMessage("エラーが発生しました。" + updateError.message);
                return;
            }

            // 入力フォームクリア
            reset();
            setMessage(
                "本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。"
            );
        } catch (error) {
            setMessage("エラーが発生しました。" + error);
            return;
        } finally {
            setLoading(false);
            router.refresh();
        }
    };

    return (
        <div>
            <h1>サインイン</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>
                    名前:
                    <input
                        type="text"
                        {...register("name", { required: true })}
                    />
                </p>
                <p>
                    メールアドレス:
                    <input
                        type="mail"
                        {...register("email", { required: true })}
                    />
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
                        <button type="submit">
                            サインアップ
                        </button>
                    )}
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Signup;
