import {
  Text,
  Heading,
  ListItem,
  UnorderedList,
  OrderedList,
  Button,
} from "@chakra-ui/react";
import { useSlate } from "slate-react";
import { ReactNode } from "react";
import {
  toggleBlock,
  isBlockActive,
  toggleMark,
  isMarkActive,
} from "./TextEditorFunc";

export const DefaultElement = (props: any) => {
  return (
    <Text {...props.attributes} mb="10px">
      {props.children}
    </Text>
  );
};

export const LeftElement = (props: any) => {
  return (
    <Text {...props.attributes} textAlign="left" mb="10px">
      {props.children}
    </Text>
  );
};

export const CenterElement = (props: any) => {
  return (
    <Text {...props.attributes} textAlign="center" mb="10px">
      {props.children}
    </Text>
  );
};

export const RightElement = (props: any) => {
  return (
    <Text {...props.attributes} textAlign="right" mb="10px">
      {props.children}
    </Text>
  );
};

export const TitleElement = (props: any) => {
  return (
    <Heading {...props.attributes} as="h2" mb="10px" fontSize="24px">
      {props.children}
    </Heading>
  );
};

export const ListItemElement = (props: any) => {
  return <li {...props.attributes}>{props.children}</li>;
};

export const BulletedListElement = (props: any) => {
  return (
    <ul
      {...props.attributes}
      style={{ marginBottom: "10px", listStyle: "inside" }}
    >
      {props.children}
    </ul>
  );
};

export const NumberedListElement = (props: any) => {
  return (
    <ol
      {...props.attributes}
      style={{
        marginBottom: "10px",
        listStyle: "inside",
        listStyleType: "decimal",
      }}
    >
      {props.children}
    </ol>
  );
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
