import {
  Text,
  Code,
  Heading,
  ListItem,
  UnorderedList,
  OrderedList,
  Button
} from "@chakra-ui/react";

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

export const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <Code p="30px">{props.children}</Code>
    </pre>
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
