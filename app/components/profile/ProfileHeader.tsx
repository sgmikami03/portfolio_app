"use client";

import { Profile } from "@/type";
import { FC, useState } from "react";
import Image from "next/image";
import userImage from "@/public/images/icon/user.png";
import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";

type ProfileHeaderProps = {
  profile: Profile | null;
  isEdit: boolean;
};

const ProfileHeader: FC<ProfileHeaderProps> = ({ profile, isEdit }) => {
  const [showProfile, setShowProfile] = useState(profile);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <button onClick={onClose}>close</button>
        </ModalContent>
      </Modal>
      <div className="bg-app-bg h-[360px]">
        <div className="mx-auto pt-[220px] px-[16px] pb-[55px] max-w-[800px] relative">
          <Image
            src={userImage}
            alt=""
            width={96}
            className="absolute top-[220px] left-[16px] w-[96px] h-[96px] object-cover"
          />
          {isEdit ? (
            <button onClick={onOpen}>
              <h2 className="pl-[112px] text-4xl font-bold leading-[54px]">
                {showProfile?.name}
                <EditIcon color={"#333"} w={"20px"} ml={"10px"} />
              </h2>
            </button>
          ) : (
            <h2 className="pl-[112px] text-4xl font-bold leading-[54px]">
              {showProfile?.name}
            </h2>
          )}
          <p className="pl-[112px] text-xl font-medium leading-[30px]">
            {showProfile?.occupation}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
