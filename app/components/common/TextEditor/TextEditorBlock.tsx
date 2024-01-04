import {
  Text,
  Code,
  Heading,
  ListItem,
  UnorderedList,
  OrderedList,
  Button,
  Link,
} from "@chakra-ui/react";
import { useSlate } from "slate-react";
import { ReactNode } from "react";
import {
  toggleBlock,
  isBlockActive,
  toggleMark,
  isMarkActive,
} from "./TextEditorFunc";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const DefaultElement = (props: any) => {
  return <Text {...props.attributes}>{props.children}</Text>;
};

export const LeftElement = (props: any) => {
  return (
    <Text {...props.attributes} textAlign="left">
      {props.children}
    </Text>
  );
};

export const CenterElement = (props: any) => {
  return (
    <Text {...props.attributes} textAlign="center">
      {props.children}
    </Text>
  );
};

export const RightElement = (props: any) => {
  return (
    <Text {...props.attributes} textAlign="right">
      {props.children}
    </Text>
  );
};

export const TitleElement = (props: any) => {
  return (
    <Heading {...props.attributes} as="h2">
      {props.children}
    </Heading>
  );
};

export const ListItemElement = (props: any) => {
  return <ListItem {...props.attributes}>{props.children}</ListItem>;
};

export const BulletedListElement = (props: any) => {
  return <UnorderedList {...props.attributes}>{props.children}</UnorderedList>;
};

export const NumberedListElement = (props: any) => {
  return <OrderedList {...props.attributes}>{props.children}</OrderedList>;
};

export const Leaf = (props: any) => {
  return (
    <Text
      {...props.attributes}
      as="span"
      fontWeight={props.leaf.bold ? "bold" : "normal"}
      fontStyle={props.leaf.italic ? "italic" : "normal"}
      textDecoration={props.leaf.underline ? "underline" : "none"}
    >
      {props.children}
    </Text>
  );
};

type ButtonProps = {
  format: string;
  icon: ReactNode;
};

export const MarkButton = (props: ButtonProps): ReactNode => {
  const editor = useSlate();
  return (
    <Button
      color={isMarkActive(editor, props.format) ? "#333" : "#B1B1B1"}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, props.format);
      }}
      size="sm"
      p={1}
    >
      {props.icon}
    </Button>
  );
};

export const BlockButton = (props: ButtonProps): ReactNode => {
  const editor = useSlate();
  return (
    <Button
      color={isBlockActive(editor, props.format) ? "#333" : "#B1B1B1"}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, props.format);
      }}
      size="sm"
      p={1}
    >
      {props.icon}
    </Button>
  );
};
