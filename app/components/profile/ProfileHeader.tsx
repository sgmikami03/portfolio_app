"use client";

import { Profile } from "@/type";
import { FC, useState } from "react";
import {
  Image,
  Button,
  Box,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import ProfileEditModal from "./ProfileEditModal";

type ProfileHeaderProps = {
  profile: Profile | null;
  isEdit: boolean;
};

const ProfileHeader: FC<ProfileHeaderProps> = (props) => {
  const [profile, setProfile] = useState<Profile | null>(props.profile);
  const [iconImageUrl, setIconImageUrl] = useState<string>(
    profile?.icon_image || "/images/icon/user.png"
  );
  const [iconImage, setIconImage] = useState<File | null>(null);
  const isEdit = props.isEdit;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ProfileEditModal
        profile={profile}
        setProfile={setProfile}
        iconImageUrl={iconImageUrl}
        setIconImageUrl={setIconImageUrl}
        iconImage={iconImage}
        setIconImage={setIconImage}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Box bgColor="gray.50" height="360px">
        <Box
          mx="auto"
          pt="220px"
          px="16px"
          pb="55px"
          maxW="800px"
          position="relative"
        >
          <Box
            width={{ base: "50px", md: "96px" }}
            height={{ base: "50px", md: "96px" }}
            position="absolute"
            top="230px"
            left="16px"
          >
            <Image
              src={iconImageUrl}
              alt=""
              width={96}
              height={96}
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          {isEdit ? (
            <Button type="button" onClick={onOpen} variant="unstyled">
              <Heading
                as="h2"
                fontSize={{ base: "24px", md: "32px" }}
                fontWeight="bold"
                lineHeight="54px"
                paddingLeft={{ base: "70px", md: "112px" }}
              >
                {profile?.name}
                <EditIcon color={"#333"} w={"20px"} ml={"10px"} />
              </Heading>
            </Button>
          ) : (
            <Heading
              as="h2"
              fontSize={{ base: "24px", md: "32px" }}
              fontWeight="bold"
              lineHeight="54px"
              paddingLeft={{ base: "70px", md: "112px" }}
            >
              {profile?.name}
            </Heading>
          )}
          <Text
            fontSize="20px"
            fontWeight="medium"
            lineHeight="30px"
            paddingLeft={{ base: "70px", md: "112px" }}
          >
            {profile?.occupation}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default ProfileHeader;
