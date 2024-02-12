import { useState, Dispatch } from "react";
import {
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Box,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createCareers } from "@/lib/supabase/careers";
type Schema = z.infer<typeof schema>;

import EditModal from "../common/EditModal";
import { Careers } from "@/type";

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string(),
  occupation: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  text: z.string(),
});

type ProfileCareerCreateModalProps = {
  profileId: string,
  isOpen: boolean;
  onClose: () => void;
  setCareers: Dispatch<React.SetStateAction<Careers[]>>;
};

const ProfileCareerCreateModal = ({
  profileId,
  isOpen,
  onClose,
  setCareers,
}: ProfileCareerCreateModalProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: {
      name: "",
      occupation: "",
      start: new Date("2000/01/01"),
      end: new Date("2000/01/01"),
      text: "",
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    console.log(data);

    try {
      const { message, careers: newCareers } = await createCareers(
        profileId,
        data.name,
        data.occupation,
        data.start,
        data.end,
        data.text
      );

      if (message == "ng") {
        console.log("errorが発生しました。");
      } else {
        setCareers(newCareers);
        reset();
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
          Profile
        </Heading>
        <form>
          <FormControl mb={3} textAlign="left">
            <FormLabel
              htmlFor="name"
              mb={1}
              fontWeight="medium"
              display="inline-block"
            >
              会社名
            </FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />
          </FormControl>
          <FormControl mb={3} textAlign="left">
            <FormLabel
              htmlFor="occupation"
              mb={1}
              fontWeight="medium"
              display="inline-block"
            >
              職業
            </FormLabel>
            <Input
              id="occupation"
              type="text"
              placeholder="Occupation"
              {...register("occupation", { required: false })}
            />
          </FormControl>
          <FormControl mb={3} textAlign="left">
            <FormLabel mb={1} fontWeight="medium" display="block">
              期間
            </FormLabel>
            <Input
              id="start"
              type="date"
              placeholder="start"
              width={`calc(50% - 15px)`}
              display="inline-block"
              {...register("start")}
            />
            <Text width="30px" display="inline-block" textAlign="center">
              ~
            </Text>
            <Input
              id="end"
              type="date"
              placeholder="end"
              width={`calc(50% - 15px)`}
              display="inline-block"
              {...register("end")}
            />
          </FormControl>
          <FormControl mb={6} textAlign="left">
            <FormLabel
              htmlFor="text"
              mb={1}
              fontWeight="medium"
              display="inline-block"
            >
              やったこと
            </FormLabel>
            <Textarea
              id="text"
              placeholder="やったこと"
              {...register("text", { required: false })}
            />
          </FormControl>
          <Box>
            <Button type="button" colorScheme="gray" onClick={onClose} mr={4}>
              変更せずに戻る
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              colorScheme="blue"
            >
              内容を変更する
            </Button>
          </Box>
        </form>
      </>
    </EditModal>
  );
};

export default ProfileCareerCreateModal;
