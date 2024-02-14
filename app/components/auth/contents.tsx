import { Card, Box } from "@chakra-ui/react";

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        maxW="480px"
        mx="20px"
        p={{ base: "16px", md: "30px" }}
        textAlign="center"
      >
        {children}
      </Card>
    </Box>
  );
};

export default Contents;
