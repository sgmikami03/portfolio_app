import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import { getWorksByIdWithProfiles } from "@/lib/supabase/works";
import { Work } from "@/type";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import { redirect } from "next/navigation";
import Image from "next/image";
import TextEditorReadOnly from "@/components/common/TextEditor/TextEditorReadOnry";
import Layout from "@/components/common/Layout";
import Link from "next/link";

type PageProps = {
  params: {
    work_id: string;
  };
};

const WorkDetail: NextPage<PageProps> = async ({ params: { work_id } }) => {
  const works: Work | null = await getWorksByIdWithProfiles(work_id);

  if (!works?.id) {
    redirect("/404");
  }

  //ログインユーザーの取得
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isCanEdit = session?.user.id == works?.profiles.id;
  const thumbnailImageUrl = works?.thumbnail || "/images/sample/works.png";
  const iconImageUrl = works.profiles?.icon_image || "/images/icon/user.png";

  return (
    <Layout>
      <Box as="main">
        <Flex justifyContent="center" padding="60px 0" bgColor="gray.50">
          <Box
            borderRadius="10px"
            boxShadow="0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
            bg="#fff"
            width={{ base: "100%", md: "400px" }}
            height={{ base: "240px", md: "300px" }}
            mx="16px"
            position="relative"
          >
            <Image
              src={thumbnailImageUrl}
              width={400}
              height={300}
              alt=""
              style={{
                borderRadius: "10px",
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Flex>
        <Box m="30px auto 60px auto" maxW="800px" px="16px">
          {isCanEdit ? (
            <Link href={`/work/${works.id}/edit`}>
              <Text as="h1" fontSize="24px" fontWeight="bold">
                {works.title}
                <Edit style={{ width: 20, marginLeft: 10 }} />
              </Text>
            </Link>
          ) : (
            <Text as="h1" fontSize="24px" fontWeight="bold">
              {works.title}
            </Text>
          )}
          <Text mb="20px" fontWeight="bold">
            {works.production}
          </Text>
          {works.profiles ? (
            <Flex mb="40px" as={Link} href={`/profile/${works.profiles.id}`}>
              <Box
                width="25px"
                height="25px"
                borderRadius="9999px"
                position="relative"
                overflow="hidden"
              >
                <Image
                  src={iconImageUrl}
                  alt=""
                  width={25}
                  height={25}
                  style={{
                    borderRadius: "10px",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Text fontWeight="bold" ml="5px">
                {works.profiles.name}
                <Text as="span" display="inline-block" fontSize="12px" ml="5px">
                  {works.profiles.occupation}
                </Text>
              </Text>
            </Flex>
          ) : (
            <></>
          )}
          <TextEditorReadOnly text={works?.text?.data} />
        </Box>
      </Box>
    </Layout>
  );
};

export default WorkDetail;
