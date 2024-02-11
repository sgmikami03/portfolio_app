import Layout from "@/components/common/Layout";
import Hero from "@/components/top/Hero";

import { getWorksWithLimitWithProfiles } from "@/lib/supabase/works";
import WorkCards from "@/components/works/WorksCards";
import SectionTitle from "@/components/common/SectionTitle";
import { Button, Box } from "@chakra-ui/react";
import Link from "next/link";

const Home = async () => {
  const works = await getWorksWithLimitWithProfiles(6, 0);

  return (
    <Layout>
      <Hero />

      <section>
        <Box maxW="800px" mx="auto">
          <SectionTitle text={"みんなの作品を見る"} />
        </Box>
        <WorkCards works={works} />
        <Button
          colorScheme="blue"
          variant="outline"
          display="block"
          m="0 auto 60px auto"
        >
          <Link href="/work/list/1">もっとみる</Link>
        </Button>
      </section>
    </Layout>
  );
};

export default Home;
