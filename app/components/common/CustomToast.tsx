import { Box, Card, Text } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

type CustomToastProps = {
  title: string;
  text: string;
  status: "success" | "error";
};

const CustomToast = ({ title, text, status }: CustomToastProps) => {
  return (
    <Card
      w="300px"
      p="12px 12px 12px 40px"
      borderRadius="10px"
      bgColor="gray.50"
    >
      {status == "success" ? (
        <CheckCircleIcon
          color="blue.500"
          w="24px"
          position="absolute"
          top="16px"
          left="12px"
        />
      ) : (
        <WarningIcon
          color="red.500"
          w="24px"
          position="absolute"
          top="16px"
          left="12px"
        />
      )}
      <Text fontWeight="bold" mb="5px" color="#333">
        {title}
      </Text>
      <Text fontSize="12px" color="#333">
        {text}
      </Text>
    </Card>
  );
};

export default CustomToast;
