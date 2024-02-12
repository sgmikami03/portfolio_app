import Layout from "@/components/common/Layout";
import { Box, Text, Button } from "@chakra-ui/react";
import SplineBlock from "@/components/common/Spline";
import Link from "next/link";

const NotFound = () => {
  return (
    <Layout>
      <Box
        bg="#F7FAFC"
        height="calc(100vh - 64px - 30px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box pb="60px">
          <SplineBlock
            scene="https://prod.spline.design/YC6khECwjJVCY3Rr/scene.splinecode"
            width={100}
            height={140}
          />
          <Text textAlign="center" fontWeight="bold">
            ページが見つかりませんでした...
            <br />
            <Button colorScheme="blue" mt="20px">
              <Link href="/">Topにもどる</Link>
            </Button>
          </Text>
        </Box>
      </Box>
    </Layout>
  );
};

export default NotFound;
