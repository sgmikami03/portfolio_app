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
      mb="32px"
      maxW="800px"
      display="flex"
      flexWrap="wrap"
      gap="32px"
      position="relative"
      _before={{
        base: {
          display: "none",
        },
        md: {
          content: '""',
          display: "block",
          width: `calc((100% - 32px * 2)/3)`,
          order: "1",
        },
      }}
      _after={{
        base: {
          display: "none",
        },
        md: {
          content: '""',
          display: "block",
          width: `calc((100% - 32px * 2)/3)`,
        },
      }}
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
    </Box>
  );
};

export default WorkCards;
