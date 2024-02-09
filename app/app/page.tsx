import Layout from "@/components/common/Layout";
import Hero from "@/components/top/Hero";

import { getWorksWithLimitWithProfiles } from "@/lib/supabase/works";
import WorkCards from "@/components/works/WorksCards";
import SectoinTitle from "@/components/common/SectoinTitle";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Home = async () => {
  const works = await getWorksWithLimitWithProfiles(6);

  return (
    <Layout>
      <Hero />

      <section>
        <SectoinTitle text={"みんなの作品を見る"} />
        <WorkCards works={works} />
        <Button colorScheme="blue" variant="outline" display="block" m="0 auto 60px auto">
          <Link href="/">
            {/* TODO: リンク修正 */}
            もっとみる
          </Link>
        </Button>
      </section>
    </Layout>
  );
};

export default Home;
