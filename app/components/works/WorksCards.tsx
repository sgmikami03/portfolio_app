"use client";

import { Work } from "@/type";
import { FC, useState } from "react";
import WorkCard from "./WorkCard";
import { Box } from "@chakra-ui/react";

type WorkCardsProps = {
  works: Work[] | null;
};

const WorkCards: FC<WorkCardsProps> = (props) => {
  const [works, setWorks] = useState<Work[]>(props.works ?? []);

  return (
    <Box
      mx="auto"
      px="16px"
      maxW="800px"
      display="flex"
      flexWrap="wrap"
      gap="32px"
      position="relative"
      mb={{ base: "32px", md: "0px" }}
    >
      {works.map((work, index) => (
        <WorkCard
          work={work}
          key={index}
          profile={work.profiles}
          isEdit={false}
          setWorks={setWorks}
        />
      ))}

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

export default WorkCards;
