"use client";

import { FC, useState, useCallback, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Box,
  Card,
  FormLabel,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  createWorks,
  updateThumbnailImage,
  updateWorks,
} from "@/lib/supabase/works";
import { useForm, SubmitHandler } from "react-hook-form";
import { Descendant } from "slate";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import * as z from "zod";

import TextEditor from "@/components/common/TextEditor/TextEditor";
import { v4 as uuidv4 } from "uuid";
type Schema = z.infer<typeof schema>;

const schema = z.object({
  title: z.string().min(1, { message: "タイトルは必須の項目です。" }),
  production: z.string(),
});

type WorkFormProps = {
  profileId: string;
  isNew: boolean;
  work?: any;
};

const WorkForm: FC<WorkFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: props?.work?.title ?? "",
      production:
        props?.work?.production ?? new Date().toISOString().split("T")[0],
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  const [text, setText] = useState<Descendant[] | undefined>(
    props.work?.text?.data ?? undefined
  );
  const [fileMessage, setFileMessage] = useState("");
  const [isUseSettingThumbnailImage, setIsUseSettingThumbnailImage] = useState(
    props.work?.thumbnail ? true : false
  );
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const workId = props.work?.id ?? uuidv4();
  const profileId = props.profileId;
  const isNew = props.isNew;
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeThumbnailImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      // ファイルが選択されていない場合
      if (!files || files?.length == 0) {
        return;
      }

      const fileSize = files[0]?.size / 1024 / 1024; // size in MB

      // 画像サイズが2MBを超える場合
      if (fileSize > 2) {
        toast({
          title: "works保存失敗",
          description: "画像サイズを2MB以下にする必要があります。",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
        return;
      }

      // 画像をセット
      setFileMessage(files[0].name);
      setThumbnailImage(files[0]);
    },
    []
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (data) => {
      try {
        setLoading(true);

        let newThumbnailImageUrl = null;

        if (isUseSettingThumbnailImage) {
          newThumbnailImageUrl = props.work.thumbnail;
        } else if (thumbnailImage) {
          newThumbnailImageUrl = await updateThumbnailImage(
            workId,
            thumbnailImage
          );
        }

        let message = "ng";
        if (isNew) {
          const res = await createWorks(
            workId,
            profileId,
            data.title,
            data.production,
            text,
            newThumbnailImageUrl
          );
          message = res.message;
        } else {
          const res = await updateWorks(
            workId,
            profileId,
            data.title,
            data.production,
            text,
            newThumbnailImageUrl
          );
          message = res.message;
        }

        if (message == "ng") {
          toast({
            title: "works保存失敗",
            description:
              "正常に保存することができませんでした。再度お試しください。",
            status: "error",
            duration: 10000,
            isClosable: true,
          });
          setLoading(false);
          return;
        } else {
          toast({
            title: "works保存完了",
            description: "worksを保存できました",
            status: "success",
            duration: 10000,
            isClosable: true,
          });
          router.push(`/work/${workId}`);
        }
      } catch (error) {
        console.error("Zodバリデーションエラー", error);
        setLoading(false);
      }
    },
    [text, isUseSettingThumbnailImage, thumbnailImage]
  );

  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt="40px" pb="30px">
            <Box textAlign="center">
              <Text mb="20px" fontWeight="bold">
                修正された内容は戻りませんがよろしいでしょうか？
              </Text>
              <Link href="/" passHref>
                <Button as="a" variant="outline" colorScheme="blue">
                  保存せずに戻る
                </Button>
              </Link>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box as="header" bg="#fff">
        <Box
          margin="0 auto"
          maxW="800px"
          h="64px"
          px="16px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src="/images/icon/icon.png" alt="" width={173} height={20} />
          <Box>
            <Button variant="outline" colorScheme="blue" onClick={onOpen}>
              保存せずに戻る
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
              ml="10px"
              isDisabled={loading}
            >
              保存する
            </Button>
          </Box>
        </Box>
      </Box>
      <Box backgroundColor="gray.50">
        <Box
          as="main"
          margin="0 auto"
          maxW="800px"
          minH="calc(100vh - 64px - 30px)"
        >
          <form
            onSubmit={() => {
              return false;
            }}
          >
            <Box mb="20px">
              <Input
                id="title"
                type="text"
                placeholder="タイトル"
                variant="unstyled"
                border="none"
                fontSize="24px"
                height="36px"
                m="30px 16px 0 16px"
                fontWeight="bold"
                {...register("title")}
              />
              {typeof errors.title?.message == "string" && (
                <Text ml="16px" textColor="red">
                  {errors.title?.message}
                </Text>
              )}
            </Box>
            <Input
              id="production"
              type="date"
              placeholder="制作日"
              variant="unstyled"
              border="none"
              fontSize="16px"
              maxW="145px"
              height="24px"
              m="0px 16px 15px 16px"
              fontWeight="bold"
              cursor="pointer"
              {...register("production")}
            />
          </form>

          <Box m="0px 15px 60px 15px" display="flex" gap="10px">
            {isUseSettingThumbnailImage ? (
              <>
                <Button
                  border="1px #B1B1B1 dashed"
                  bg="none"
                  onClick={() => {
                    setIsUseSettingThumbnailImage(false);
                  }}
                >
                  サムネイル画像を変更する
                </Button>
                <Image
                  src={props.work.thumbnail}
                  alt=""
                  width={50}
                  height={40}
                  style={{ objectFit: "cover" }}
                />
              </>
            ) : (
              <>
                <FormLabel htmlFor="thumbnail-input" cursor="pointer">
                  <Button as="span" border="1px #B1B1B1 dashed" bg="none">
                    サムネイル画像
                  </Button>
                  <Input
                    id="thumbnail-input"
                    type="file"
                    onChange={(e) => changeThumbnailImage(e)}
                    display="none"
                  />
                </FormLabel>
                {thumbnailImage ? (
                  <Image
                    src={URL.createObjectURL(thumbnailImage)}
                    alt=""
                    width={50}
                    height={40}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <></>
                )}
                <Text as="span" lineHeight="40px">
                  {fileMessage}
                </Text>
              </>
            )}
          </Box>

          <Card p="16px" minH="400px">
            <TextEditor text={text} setText={setText} />
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default WorkForm;
