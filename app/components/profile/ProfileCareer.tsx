import { Careers } from "@/type";
import { FC, Dispatch } from "react";
import {
  Image,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
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

  const careerImage = "/images/icon/carrier.png";

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
          left: {base: "40px", md: "49px"},
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
          w={{base: "50px", md: "70px" }}
          mr={{base: "10px", md: "26px" }}
          position="relative"
          zIndex={1}
        >
          <Image mx="auto" src={careerImage} width={70} alt="" style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
          }} />
        </Box>
        <Box w={{base: "calc(100% - 50px - 10px)", md: "calc(100% - 70px - 26px)" }}>
          {isEdit ? (
            <Popover>
              <PopoverTrigger>
                <Button variant="unstyled">
                  <Box
                    mb="5px"
                    fontSize={{base: "16px", md: "20px"}}
                    fontWeight="bold"
                    lineHeight="30px"
                    display="flex"
                    alignItems="center"
                  >
                    {career.name}
                    <Text ml="2" fontSize="base" color="blue.500">
                      {career.start
                        ? getDateFromSupabaseDate(career.start).getFullYear()
                        : ""}
                      -
                      {career.end
                        ? getDateFromSupabaseDate(career.end).getFullYear()
                        : ""}
                    </Text>
                    <EditIcon color="#333" w="15px" ml="7px" />
                  </Box>
                </Button>
              </PopoverTrigger>
              <PopoverContent width="auto">
                <PopoverArrow />
                <PopoverBody>
                  <Button onClick={onOpenEditModal} display="block" mb="5px">
                    <EditIcon color="#333" w="15px" mr="7px" mb="3px" />
                    編集する
                  </Button>
                  <Button onClick={onOpenDeleteModal} display="block">
                    <DeleteIcon color="#333" w="15px" mr="7px" mb="4px" />
                    削除する
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Text fontSize="xl" fontWeight="bold" lineHeight="30px" mb="5px">
              {career.name}
              <Text ml="2" fontSize="base" color="blue.500">
                {career.start
                  ? getDateFromSupabaseDate(career.start).getFullYear()
                  : ""}
                -
                {career.end
                  ? getDateFromSupabaseDate(career.end).getFullYear()
                  : ""}
              </Text>
            </Text>
          )}
          <Text fontSize="medium" fontWeight="medium">
            {career.occupation}
          </Text>
          {career.text && (
            <Text fontWeight="medium" mt="20px" whiteSpace="pre-wrap">
              {career.text}
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProfileCareer;
