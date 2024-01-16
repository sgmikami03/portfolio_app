import { Box } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box
      as="footer"
      fontWeight="bold"
      color="#fff"
      h="30px"
      lineHeight="30px"
      textAlign="center"
      bg="#333"
      fontSize="14px"
    >
      ©︎ Portfolio App
    </Box>
  );
};

export default Footer;