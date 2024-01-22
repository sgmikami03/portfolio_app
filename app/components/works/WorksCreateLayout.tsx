import Footer from "@/components/common/Fotter";
import { Box } from "@chakra-ui/react";

const WorksCreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box as="main" minH="calc(100vh - 30px)">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default WorksCreateLayout;
