import { Careers } from "@/type";
import { FC, Dispatch } from "react";
import Image from "next/image";
import careerImage from "@/public/images/icon/carrier.png";
import { EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import ProfileCareerCreateModal from "./ProfileCareerCreateModal";

type ProfileCareerCreateProps = {
  setCareers: Dispatch<React.SetStateAction<Careers[]>>;
  profileId: string;
}

const ProfileCareerCreate: FC<ProfileCareerCreateProps> = ({setCareers, profileId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <ProfileCareerCreateModal isOpen={isOpen} onClose={onClose} setCareers={setCareers} profileId={profileId} />
      <div
        className="
    mx-auto mb-[40px] px-[16px] max-w-[800px] flex gap-[16px] relative
    before:inline-block before:absolute before:w-[3px] before:h-[calc(100%+40px)] before:top-0 before:left-[63px] before:bg-app-bg-g before:z-0 
    last:before:opacity-0
    "
      >
        <div className="w-[96px] relative z-1">
          <Image className="mx-auto" src={careerImage} width={70} alt="" />
        </div>
        <div>
          <button onClick={onOpen}>
            <h3 className="mb-[5px] text-xl font-bold leading-[30px]">
              新しく経歴を入力する
              <EditIcon color={"#333"} w={"15px"} ml={"7px"} />
            </h3>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileCareerCreate;
