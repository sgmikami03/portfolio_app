import Footer from "@/components/common/Fotter";
import Header from "@/components/common/Header";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box as="main" minH="calc(100vh - 64px - 30px)">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
