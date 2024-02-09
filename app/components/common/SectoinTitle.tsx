import { Heading } from "@chakra-ui/react";

type SectoinTitlePrpps = {
  text: string;
};

const SectoinTitle = ({ text }: SectoinTitlePrpps) => {
  return (
    <Heading
      maxW="800px"
      mx="auto"
      mt="34px"
      mb="30px"
      px="16px"
      fontSize="24px"
      fontWeight="bold"
      as="h2"
    >
      {text}
    </Heading>
  );
};

export default SectoinTitle;
