import { NextPage } from "next";
import {
  countWorks,
  getWorksWithLimitWithProfiles,
} from "@/lib/supabase/works";
import { Work } from "@/type";
import { Box, Text, Button } from "@chakra-ui/react";
import Layout from "@/components/common/Layout";
import WorkCards from "@/components/works/WorksCards";
import SectionTitle from "@/components/common/SectionTitle";
import Link from "next/link";

type PageProps = {
  params: {
    page: number;
  };
};

const WorkDetail: NextPage<PageProps> = async ({ params }) => {
  const page: number = Number(params.page);
  const num = 12;
  const works: Work[] | null = await getWorksWithLimitWithProfiles(
    num,
    (page - 1) * num
  );

  const worksCount: number = await countWorks();
  const maxPage: number = Math.ceil(worksCount / num);
  const minPage: number = 0;

  return (
    <Layout>
      <Box as="main">
        <Box m="0 auto 60px auto" pt="30px" maxW="800px" as="section">
          <SectionTitle text={`作品一覧`} subText={`ページ ${page}`} />
          <Box>
            {works?.length ? (
              <>
                <WorkCards works={works} />

                <Box
                  display="flex"
                  justifyContent="center"
                  gap="5px"
                  flexWrap="wrap"
                >
                  {minPage < page - 3 && (
                    <Button colorScheme="blue" variant="outline" px="10px">
                      <Link href={`/work/list/${minPage + 1}`}>{"<<"}</Link>
                    </Button>
                  )}
                  {minPage < page - 2 && (
                    <Button colorScheme="blue" variant="outline">
                      <Link href={`/work/list/${page - 2}`}></Link>
                      {page - 2}
                    </Button>
                  )}
                  {minPage < page - 1 && (
                    <Button colorScheme="blue" variant="outline">
                      <Link href={`/work/list/${page - 1}`}>{page - 1}</Link>
                    </Button>
                  )}
                  <Button colorScheme="blue" variant="link" _hover={{}}>
                    {page}
                  </Button>
                  {page + 1 <= maxPage && (
                    <Button colorScheme="blue" variant="outline">
                      <Link href={`/work/list/${page + 1}`}>{page + 1}</Link>
                    </Button>
                  )}
                  {page + 2 <= maxPage && (
                    <Button colorScheme="blue" variant="outline">
                      <Link href={`/work/list/${page + 2}`}>{page + 2}</Link>
                    </Button>
                  )}
                  {page + 3 <= maxPage && (
                    <Button colorScheme="blue" variant="outline" px="10px">
                      <Link href={`/work/list/${maxPage}`}>{">>"}</Link>
                    </Button>
                  )}
                </Box>
              </>
            ) : (
              <Text>あなたが検索した作品はありません...</Text>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default WorkDetail;
