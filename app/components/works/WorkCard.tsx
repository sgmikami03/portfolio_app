import { Work, Profile } from "@/type";
import { FC, Dispatch } from "react";
import Image from "next/image";
import { Box, Card, Heading } from "@chakra-ui/react";
import Link from "next/link";

type WorkCardProps = {
  profile: Profile | null;
  work: Work;
  isEdit: boolean;
  setWorks: Dispatch<React.SetStateAction<Work[]>>;
};

const WorkCard: FC<WorkCardProps> = (props) => {
  const work = props.work;
  const profile = props.profile;

  const thumbnailImageUrl = work?.thumbnail || "/images/sample/works.png";
  const iconImageUrl = profile?.icon_image || "/images/icon/user.png";

  return (
    <Card
      width={{ base: "100%", md: `calc((100% - 32px * 2)/3)` }}
      maxW={{ base: "350px", md: "inherit" }}
      mx={{ base: "auto", md: "inherit" }}
    >
      <Link href={`/work/${work.id}`}>
        <Box
          h="130px"
          w="100%"
          as="p"
          position="relative"
          minH={{ base: "200px", md: "inherit" }}
        >
          <Image
            src={thumbnailImageUrl}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Heading as="h3" fontSize="16px" fontWeight="bold" margin="10px">
          {work.title}
        </Heading>
        <Box
          display="flex"
          gap="10px"
          margin="0 10px 10px 10px"
          as="p"
        >
          <Box
            as="span"
            display="block"
            width="25px"
            height="25px"
            borderRadius="9999px"
            position="relative"
            overflow="hidden"
          >
            <Image
              src={iconImageUrl}
              alt=""
              width={25}
              height={25}
              style={{
                borderRadius: "10px",
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          {profile?.name}
        </Box>
      </Link>
    </Card>
  );
};

export default WorkCard;
