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

const WorkCardsWithCreateCard: FC<WorkCardsProps> = (props) => {
  const [works, setWorks] = useState<Work[]>(props.works);
  const isEdit = props.isEdit;
  const profile = props.profile;

  return (
    <Box
      mx="auto"
      px="16px"
      maxW="800px"
      display="flex"
      flexWrap="wrap"
      gap="32px"
      position="relative"
      justifyContent="space-between"
      mb={{ base: "32px", md: "0px" }}
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

      {/* flexのための空ブロック */}
      <Box
        as="span"
        display={{ base: "none", md: "block" }}
        width={`calc((100% - 32px * 2)/3)`}
      ></Box>
      <Box
        as="span"
        display={{ base: "none", md: "block" }}
        width={`calc((100% - 32px * 2)/3)`}
      ></Box>
    </Box>
  );
};

export default WorkCardsWithCreateCard;
