import { useState, Dispatch } from "react";
import { Button, Heading, Box, Text } from "@chakra-ui/react";

import { DeleteCareers } from "@/lib/supabase/careers";

import EditModal from "../common/EditModal";
import { Careers } from "@/type";
import { useRouter } from "next/navigation";

type ProfileCareerDeleteModalProps = {
  career: Careers;
  profileId: string;
  isOpen: boolean;
  onClose: () => void;
  setCareers: Dispatch<React.SetStateAction<Careers[]>>;
};

const ProfileCareerDeleteModal = ({
  career,
  profileId,
  isOpen,
  onClose,
  setCareers,
}: ProfileCareerDeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 送信
  const onSubmit = async () => {
    setLoading(true);

    try {
      const { message, careers: newCareers } = await DeleteCareers(
        career.id,
        profileId
      );

      if (message == "ng") {
        console.log("errorが発生しました。");
        setLoading(false);
      } else {
        router.refresh();
        setLoading(false);
        setCareers(newCareers);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EditModal isOpen={isOpen} onClose={onClose}>
      <>
        <Heading
          as="h4"
          mb={6}
          fontSize="24px"
          fontWeight="bold"
          letterSpacing="wide"
        >
          Career
        </Heading>
        <Text marginBottom={30}>{`"${career.name}" を削除しますか？`}</Text>
        <Box>
          <Button
            type="button"
            colorScheme="gray"
            onClick={onClose}
            mr={{ base: 4, md: 2 }}
            px={{ base: "10px", md: "16px" }}
          >
            削除せずに戻る
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            colorScheme="red"
            px={{ base: "10px", md: "16px" }}
            isDisabled={loading}
          >
            経歴を削除する
          </Button>
        </Box>
      </>
    </EditModal>
  );
};

export default ProfileCareerDeleteModal;
