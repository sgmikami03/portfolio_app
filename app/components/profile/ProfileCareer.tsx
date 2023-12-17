import { Careers } from "@/type";
import { FC, Dispatch } from "react";
import Image from "next/image";
import careerImage from "@/public/images/icon/carrier.png";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
} from "@chakra-ui/react";
import ProfileCareerDeleteModal from "./ProfileCareerDeleteModal";
import ProfileCareerEditModal from "./ProfileCareerEditModal";

type ProfileCareerProps = {
  profileId: string;
  career: Careers;
  isEdit: boolean;
  setCareers: Dispatch<React.SetStateAction<Careers[]>>;
};

const ProfileCareer: FC<ProfileCareerProps> = (props) => {
  const career = props.career;
  const isEdit = props.isEdit;
  const profileId = props.profileId;
  const setCareers = props.setCareers;

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const getDateFromSupabaseDate = (supabaseDate: Date) => {
    const date = new Date(supabaseDate);
    return date;
  };

  return (
    <>
      <ProfileCareerEditModal
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        profileId={profileId}
        career={career}
        setCareers={setCareers}
      />
      <ProfileCareerDeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        profileId={profileId}
        career={career}
        setCareers={setCareers}
      />
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
            <Popover>
              <PopoverTrigger>
                <button>
                  <h3 className="mb-[5px] text-xl font-bold leading-[30px]">
                    {career.name}
                    <span className="inline-block ml-2 text-base text-app-main">
                      {career.start ? getDateFromSupabaseDate(career.start).getFullYear() : ""}-
                      {career.end ? getDateFromSupabaseDate(career.).getFullYear() : ""}
                    </span>
                    <EditIcon color={"#333"} w={"15px"} ml={"7px"} />
                  </h3>
                </button>
              </PopoverTrigger>
              <PopoverContent width={"auto"}>
                <PopoverArrow />
                <PopoverBody>
                  <Button onClick={onOpenEditModal} display={"block"} mb="5px">
                    <EditIcon color={"#333"} w={"15px"} mr={"7px"} mb={"3px"} />
                    編集する
                  </Button>
                  <Button onClick={onOpenDeleteModal} display={"block"}>
                    <DeleteIcon
                      color={"#333"}
                      w={"15px"}
                      mr={"7px"}
                      mb={"4px"}
                    />
                    削除する
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <h3 className="mb-[5px] text-xl font-bold leading-[30px]">
              {career.name}
              <span className="inline-block ml-2 text-base text-app-main">
                {career.start ? getDateFromSupabaseDate(career.start).getFullYear() : ""}-
                {career.end ? getDateFromSupabaseDate(career.end).getFullYear() : ""}
              </span>
            </h3>
          )}
          <h4 className="font-medium">{career.occupation}</h4>
          {career.text ? (
            <Text fontWeight="medium" mt="20px" whiteSpace="pre-wrap">
              {career.text}
            </Text>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCareer;
