import supabase from "../../../utils/supabase";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const { data: posts } = await supabase.from("posts").select("id");

    const res =  await supabase.from("posts").update({"title": "hoge2"}).eq("id", "eb14d457-dfc0-4d0b-9da7-414409495548")
    console.log(res)

    return posts?.map(({ id }) => ({
        id,
    }));
}

export default async function Post({
    params: { id },
}: {
    params: { id: string };
}) {
    const { data: post } = await supabase
        .from("posts")
        .select()
        .match({ id })
        .single();

    if (!post) {
        notFound();
    }

    return (
        <>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button >change-hoge</button>
        </>
    );
}
