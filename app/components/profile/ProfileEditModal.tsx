import { Profile } from "@/type";
import EditModal from "../common/EditModal";
import {
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Box,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState, Dispatch, useCallback, ChangeEvent } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateProfile, updateProfileIcon } from "@/lib/supabase/profiles";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  occupation: z.string(),
});

type ProfileEditModalProps = {
  profile: Profile | null;
  setProfile: Dispatch<React.SetStateAction<Profile | null>>;
  iconImageUrl: string;
  setIconImageUrl: Dispatch<React.SetStateAction<string>>;
  iconImage: File | null;
  setIconImage: Dispatch<React.SetStateAction<File | null>>;
  isOpen: boolean;
  onClose: () => void;
};

const ProfileEditModal = ({
  profile,
  setProfile,
  iconImageUrl,
  setIconImageUrl,
  iconImage,
  setIconImage,
  isOpen,
  onClose,
}: ProfileEditModalProps) => {
  const [loading, setLoading] = useState(false);
  const [fileMessage, setFileMessage] = useState("アイコンを変更する");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: {
      id: profile?.id || "",
      name: profile?.name || "",
      occupation: profile?.occupation || "",
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  const changeIconImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileMessage("");

    // ファイルが選択されていない場合
    if (!files || files?.length == 0) {
      setFileMessage("アイコンを変更する");
      return;
    }

    const fileSize = files[0]?.size / 1024 / 1024; // size in MB

    // 画像サイズが2MBを超える場合
    if (fileSize > 2) {
      setFileMessage("画像サイズを2MB以下にする必要があります。");
      return;
    }

    // 画像をセット
    setFileMessage(files[0].name);
    setIconImage(files[0]);
  }, []);

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      let newIconImageUrl = null;
      if (iconImage) {
        newIconImageUrl = await updateProfileIcon(
          profile!.id,
          iconImage,
          profile?.icon_image
        );
      }

      const { message, profile: newProfile } = await updateProfile(
        data.id,
        data.name,
        data.occupation,
        newIconImageUrl || null
      );

      if (message == "ng") {
        console.log("errorが発生しました。");
      } else {
        setProfile(newProfile);
        reset();
        setIconImage(null);
        setIconImageUrl(newIconImageUrl || "/images/icon/user.png");
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
          <FormControl mb={6} textAlign="left">
            <FormLabel htmlFor="iconImage" cursor="pointer">
              <Box
                mx="auto"
                w="96px"
                h="96px"
                mb={2}
                borderRadius="9999px"
                position="relative"
              >
                <Image
                  src={
                    iconImage ? URL.createObjectURL(iconImage) : iconImageUrl
                  }
                  className="rounded-full object-cover"
                  alt="avatar"
                  width={96}
                  height={96}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Input
                type="file"
                id="iconImage"
                display="none"
                onChange={(e) => changeIconImage(e)}
                accept="image/png, image/jpeg"
              />
              <Text
                color="blue.500"
                textDecoration="underline"
                fontWeight="medium"
                fontSize="14px"
                textAlign="center"
              >
                {fileMessage}
              </Text>
            </FormLabel>
          </FormControl>
          <FormControl mb={3} textAlign="left">
            <FormLabel
              htmlFor="name"
              mb={1}
              fontWeight="medium"
              display="inline-block"
            >
              表示名 (2文字以上)
            </FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />
          </FormControl>
          <FormControl mb={6} textAlign="left">
            <FormLabel
              htmlFor="name"
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
          <Box>
            <Button
              type="button"
              colorScheme="gray"
              onClick={onClose}
              mr={{ base: 4, md: 2 }}
              px={{ base: "10px", md: "16px" }}
            >
              変更せずに戻る
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              colorScheme="blue"
              px={{ base: "10px", md: "16px" }}
            >
              内容を変更する
            </Button>
          </Box>
        </form>
      </>
    </EditModal>
  );
};

export default ProfileEditModal;
