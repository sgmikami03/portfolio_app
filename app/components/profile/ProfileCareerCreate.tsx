import { Careers } from "@/type";
import { FC, Dispatch } from "react";
import Image from "next/image";
import careerImage from "@/public/images/icon/carrier.png";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure, Box, Heading } from "@chakra-ui/react";
import ProfileCareerCreateModal from "./ProfileCareerCreateModal";

type ProfileCareerCreateProps = {
  setCareers: Dispatch<React.SetStateAction<Careers[]>>;
  profileId: string;
};

const ProfileCareerCreate: FC<ProfileCareerCreateProps> = ({
  setCareers,
  profileId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ProfileCareerCreateModal
        isOpen={isOpen}
        onClose={onClose}
        setCareers={setCareers}
        profileId={profileId}
      />
      <Box
        mx="auto"
        mb="40px"
        px="16px"
        maxW="800px"
        display="flex"
        gap="16px"
        position="relative"
        _before={{
          content: '""',
          display: "inline-block",
          position: "absolute",
          width: "3px",
          height: "calc(100% + 40px)",
          top: 0,
          left: { base: "40px", md: "49px" },
          backgroundColor: "gray.50",
          zIndex: 0,
        }}
        _last={{
          _before: {
            opacity: "0",
          },
        }}
      >
        <Box
          w={{ base: "50px", md: "70px" }}
          mr={{ base: "10px", md: "26px" }}
          position="relative"
          zIndex={1}
        >
          <Image
            src={careerImage}
            width={70}
            alt=""
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
            }}
          />
        </Box>
        <Box>
          <button onClick={onOpen}>
            <Box
              mb="5px"
              fontSize={{ base: "16px", md: "20px" }}
              fontWeight="bold"
              lineHeight="30px"
              display="flex"
              alignItems="center"
            >
              新しく経歴を入力する
              <AddIcon color={"#333"} w={"15px"} ml={"7px"} mb={"4px"} />
            </Box>
          </button>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCareerCreate;
