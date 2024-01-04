import { useState, useCallback, KeyboardEvent } from "react";
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
  MarkButton,
  BlockButton,
} from "./TextEditorBlock";
import { toggleMark } from "./TextEditorFunc";

import { Box } from "@chakra-ui/react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import TitleIcon from "@mui/icons-material/Title";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

type TextEditorProps = {
  initialValue?: Descendant[];
};

const initialValueDefault: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

const TextEditor = ({ initialValue }: TextEditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(initialValue);

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

  const onkeyDown = (event: KeyboardEvent) => {
    if (!(event.metaKey || event.ctrlKey)) {
      return;
    }

    switch (event.key) {
      case "b": {
        event.preventDefault();
        toggleMark(editor, "bold");
        break;
      }
      case "i": {
        event.preventDefault();
        event.preventDefault();
        toggleMark(editor, "italic");
        break;
      }
      case "u": {
        event.preventDefault();
        toggleMark(editor, "underline");
        break;
      }
    }
  };

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <>
      <Slate
        editor={editor}
        initialValue={initialValue || initialValueDefault}
        onChange={(newValue) => setValue(newValue)}
      >
        <Box mb="10px">
          <MarkButton format="bold" icon={<FormatBoldIcon />} />
          <MarkButton format="italic" icon={<FormatItalic />} />
          <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
          <BlockButton format="heading-two" icon={<TitleIcon />} />
          <BlockButton
            format="bulleted-list"
            icon={<FormatListBulletedIcon />}
          />
          <BlockButton
            format="numbered-list"
            icon={<FormatListNumberedIcon />}
          />
          <BlockButton format="left" icon={<FormatAlignLeftIcon />} />
          <BlockButton format="center" icon={<FormatAlignCenterIcon />} />
          <BlockButton format="right" icon={<FormatAlignRightIcon />} />
          <BlockButton format="right" icon={<FormatAlignRightIcon />} />
        </Box>
        <Box
          as={Editable}
          style={{ outline: "0px" }}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={(event) => onkeyDown(event)}
        />
      </Slate>
    </>
  );
};

export default TextEditor;
