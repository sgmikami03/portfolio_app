import { Work } from "@/type";
import { FC, Dispatch } from "react";
import { Box, Card } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";

type WorkCardProps = {
  profileId: string | null;
  setWorks: Dispatch<React.SetStateAction<Work[]>>;
};

const WorkCardCreate: FC<WorkCardProps> = (props) => {
  const profileId = props.profileId;
  const setCareers = props.setWorks;

  return (
    <Card
      width={{ base: "100%", md: `calc((100% - 32px * 2)/3)` }}
      maxW={{ base: "350px", md: "inherit" }}
      minH={{ base: "250px", md: "inherit" }}
      mx={{ base: "auto", md: "inherit" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      as={Link}
      href="/work/new"
    >
      <Box fontWeight="bold">
        <AddIcon color="#EFEFEF" w="45px" h="45px" mr="7px" mb="15px" display="block" mx="auto" />
        作品を追加する
      </Box>
    </Card>
  );
};

export default WorkCardCreate;
