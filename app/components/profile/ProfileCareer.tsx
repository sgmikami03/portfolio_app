import { Careers } from "@/type";
import { FC, Dispatch } from "react";
import Image from "next/image";
import careerImage from "@/public/images/icon/carrier.png";
import { EditIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
} from "@chakra-ui/react";
import EditModal from "../common/EditModal";

type ProfileCareerProps = {
  career: Careers;
  isEdit: boolean;
};

const ProfileCareer: FC<ProfileCareerProps> = (props) => {
  const career = props.career;
  const isEdit = props.isEdit;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditModal isOpen={isOpen} onClose={onClose}>
        <p>{career.name}</p>
      </EditModal>
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
          {isEdit ? (
            <button onClick={onOpen}>
              <h3 className="mb-[5px] text-xl font-bold leading-[30px]">
                {career.name}
                <span className="inline-block ml-2 text-base text-app-main">
                  {career.start ? career.start?.slice(0, 4) : ""}-
                  {career.end ? career.end?.slice(0, 4) : ""}
                </span>
                <EditIcon color={"#333"} w={"15px"} ml={"7px"} />
              </h3>
            </button>
          ) : (
            <h3 className="mb-[5px] text-xl font-bold leading-[30px]">
              {career.name}
              <span className="inline-block ml-2 text-base text-app-main">
                {career.start ? career.start?.slice(0, 4) : ""}-
                {career.end ? career.end?.slice(0, 4) : ""}
              </span>
            </h3>
          )}
          <h4 className="font-medium">{career.occupation}</h4>
          {career.text ? (
            <p className="font-medium mt-[20px]">{career.text}</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCareer;
