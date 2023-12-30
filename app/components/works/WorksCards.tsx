"use client";

import { Profile, Work } from "@/type";
import { FC, useState } from "react";
import WorkCard from "./WorkCard";
import { Box } from "@chakra-ui/react";
import WorkCardCreate from "./WorkCardCreate";

type WorkCardsProps = {
  profile: Profile | null;
  works: Work[];
  isEdit: boolean;
};

const WorkCards: FC<WorkCardsProps> = (props) => {
  const [works, setWorks] = useState<Work[]>(props.works);
  const isEdit = props.isEdit;
  const profile = props.profile;

  return (
    <Box
      mx="auto"
      px="16px"
      maxW="800px"
      display="flex"
      justifyContent="space-between"
    >
      {works.map((work, index) => (
        <WorkCard
          work={work}
          key={index}
          isEdit={isEdit}
          profile={profile}
          setWorks={setWorks}
        />
      ))}
      {isEdit ? (
        <WorkCardCreate profileId={profile?.id || null} setWorks={setWorks} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default WorkCards;
