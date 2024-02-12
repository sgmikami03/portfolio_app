import Layout from "@/components/common/Layout";
import { Box, Card, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Layout>
      <Box
        width="100vw"
        height="calc(100vh - 64px - 30px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          maxW="75px"
          maxH="75px"
          w="100%"
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Card>
      </Box>
    </Layout>
  );
};

export default Loading;
