import { Work, Profile } from "@/type";
import { FC, Dispatch } from "react";
import Image from "next/image";
import { Text, Box, Card, Heading } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

type WorkCardProps = {
  profileId: string | null;
  setWorks: Dispatch<React.SetStateAction<Work[]>>;
};

const WorkCardCreate: FC<WorkCardProps> = (props) => {
  const profileId = props.profileId;
  const setCareers = props.setWorks;

  return (
    <Card
      as="button"
      width={`calc((100% - 32px * 2)/3)`}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box fontWeight="bold">
        <AddIcon color="#EFEFEF" w="45px" h="45px" mr="7px" mb="15px" />
        <br />
        作品を追加する
      </Box>
    </Card>
  );
};

export default WorkCardCreate;
