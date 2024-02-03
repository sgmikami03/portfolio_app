"use client";
import Layout from "@/components/common/Layout";
import { Box, Text, Button } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
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
          <Spline
            scene="https://prod.spline.design/YC6khECwjJVCY3Rr/scene.splinecode"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "auto",
              maxWidth: "100px",
              margin: "0 auto",
            }}
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
