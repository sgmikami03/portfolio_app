import { Box, Heading, Text } from "@chakra-ui/react";

type SectionTitleProps = {
  text: string;
  subText?: string;
};

const SectionTitle = ({ text, subText }: SectionTitleProps) => {
  return (
    <Box mb="30px" px="16px">
      <Heading
        maxW="800px"
        mx="auto"
        mt="34px"
        mb="10px"
        fontSize="24px"
        fontWeight="bold"
        as="h2"
      >
        {text}
      </Heading>
      {subText ?? <Text>{subText}</Text>}
    </Box>
  );
};

export default SectionTitle;
