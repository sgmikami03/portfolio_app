import { Box } from "@chakra-ui/react";
import Image from "next/image";

const Header = () => {
  return (
    <Box as="header" bg="#fff">
      <Box
        margin="0 auto"
        maxW="800px"
        h="64px"
        px="16px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src="/images/icon/icon.png" alt="" width={173} height={20} />
      </Box>
    </Box>
  );
};

export default Header;
