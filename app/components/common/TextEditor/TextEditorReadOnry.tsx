"use client"

import { useState, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import {
  DefaultElement,
  TitleElement,
  LeftElement,
  CenterElement,
  RightElement,
  ListItemElement,
  BulletedListElement,
  NumberedListElement,
  Leaf,
} from "./TextEditorBlock";
import { Box } from "@chakra-ui/react";

type TextEditorReadOnlyProps = {
  text?: Descendant[];
};

const TextEditorReadOnly = ({ text }: TextEditorReadOnlyProps) => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "heading-two":
        return <TitleElement {...props} />;
      case "left":
        return <LeftElement {...props} />;
      case "center":
        return <CenterElement {...props} />;
      case "right":
        return <RightElement {...props} />;
      case "list-item":
        return <ListItemElement {...props} />;
      case "bulleted-list":
        return <BulletedListElement {...props} />;
      case "numbered-list":
        return <NumberedListElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <>
      {text ? (
        <Slate editor={editor} initialValue={text}>
          <Box
            as={Editable}
            readOnly
            style={{ outline: "0px" }}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </Slate>
      ) : (
        <></>
      )}
    </>
  );
};

export default TextEditorReadOnly;
