"use client";

import { FC } from "react";
import { Input, Button, Box, Text, Card } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import TextEditor from "@/components/common/TextEditor/TextEditor";

type Schema = z.infer<typeof schema>;

const schema = z.object({
  title: z.string(),
  production: z.coerce.date(),
});

const WorkCreate: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: {
      title: "",
      production: new Date("2000/01/01"),
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  return (
    <Box backgroundColor="gray.50">
      <Box as="main" margin="0 auto" maxW="800px">
        <form
          onSubmit={() => {
            return false;
          }}
        >
          <Input
            id="title"
            type="text"
            placeholder="タイトルを入力してください"
            variant="unstyled"
            border="none"
            fontSize="24px"
            height="36px"
            m="30px 16px 20px 16px"
            fontWeight="bold"
            {...register("title")}
          />
          <Input
            id="production"
            type="date"
            placeholder="制作日"
            variant="unstyled"
            border="none"
            fontSize="16px"
            maxW="220px"
            height="24px"
            m="0px 16px 15px 16px"
            fontWeight="bold"
            {...register("production")}
          />
        </form>

        <Text m="0px 15px 60px 15px">
          <Button border="1px #B1B1B1 dashed" bg="none">
            サムネイル画像を追加する
          </Button>
        </Text>

        <Card p="16px">
          <TextEditor />
        </Card>
      </Box>
    </Box>
  );
};

export default WorkCreate;
