import { useEffect, useState, useCallback, KeyboardEvent } from "react";
import {
  createEditor,
  Descendant,
  BaseEditor,
  Editor,
  Element,
  Transforms,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import {
  DefaultElement,
  CodeElement,
  TitleElement,
  LeftElement,
  CenterElement,
  RightElement,
  ListItemElement,
  BulletedListElement,
  NumberedListElement,
  Leaf,
} from "./TextEditorBlock";

import { Box, Button } from "@chakra-ui/react";
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
      case "code":
        return <CodeElement {...props} />;
      case "heading-two":
        return <TitleElement {...props} />;
      case "list-item":
        return <ListItemElement {...props} />;
      case "bulleted-list":
        return <BulletedListElement {...props} />;
      case "numbered-list":
        return <NumberedListElement {...props} />;
      case "left":
        return <LeftElement {...props} />;
      case "center":
        return <CenterElement {...props} />;
      case "right":
        return <RightElement {...props} />;
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

  const toggleBlock = (editor: BaseEditor, format: string) => {
    const isActive = isBlockActive(editor, format);
    const isListSelected = isListActive(editor);
    const isList = format == "bulleted-list" || format == "numbered-list";

    if (isList && !isListSelected) {
      //@ts-ignore
      Transforms.setNodes(editor, { type: "list-item" });
      //@ts-ignore
      Transforms.wrapNodes(editor, { type: format, children: [] });
    } else if (isList && isListSelected) {
      Transforms.unwrapNodes(editor, {
        //@ts-ignore
        match: (n) => n.type == "bulleted-list" || n.type == "numbered-list",
        split: true,
      });
      //@ts-ignore
      Transforms.setNodes(editor, { type: "paragraph" });
    } else if (isListSelected) {
      Transforms.unwrapNodes(editor, {
        //@ts-ignore
        match: (n) => n.type == "bulleted-list" || n.type == "numbered-list",
        split: true,
      });
      Transforms.setNodes(
        editor,
        //@ts-ignore
        { type: isActive ? "paragraph" : format },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
      );
    } else {
      Transforms.setNodes(
        editor,
        //@ts-ignore
        { type: isActive ? "paragraph" : format },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
      );
    }
  };

  const isListActive = (editor: BaseEditor) => {
    return (
      isBlockActive(editor, "bulleted-list") ||
      isBlockActive(editor, "numbered-list")
    );
  };

  const isBlockActive = (
    editor: BaseEditor,
    format: string,
    blockType = "type"
  ) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          //@ts-ignore
          n[blockType] === format,
      })
    );
    return !!match;
  };

  const toggleMark = (editor: BaseEditor, format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isMarkActive = (editor: BaseEditor, format: string) => {
    const marks = Editor.marks(editor) as Record<string, boolean> | undefined;
    return marks ? marks[format] === true : false;
  };

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  useEffect(() => {
    console.log(value);
    console.log(Editor.nodes(editor));
  }, [value]);

  return (
    <>
      <Box>
        <Button onClick={() => toggleMark(editor, "bold")} size="sm" p={1}>
          <FormatBoldIcon />
        </Button>
        <Button onClick={() => toggleMark(editor, "italic")} size="sm" p={1}>
          <FormatItalic />
        </Button>
        <Button onClick={() => toggleMark(editor, "underline")} size="sm" p={1}>
          <FormatUnderlinedIcon />
        </Button>
        <Button
          onClick={() => toggleBlock(editor, "heading-two")}
          size="sm"
          p={1}
        >
          <TitleIcon />
        </Button>
        <Button
          onClick={() => toggleBlock(editor, "bulleted-list")}
          size="sm"
          p={1}
        >
          <FormatListBulletedIcon />
        </Button>
        <Button
          onClick={() => toggleBlock(editor, "numbered-list")}
          size="sm"
          p={1}
        >
          <FormatListNumberedIcon />
        </Button>
        <Button onClick={() => toggleBlock(editor, "left")} size="sm" p={1}>
          <FormatAlignLeftIcon />
        </Button>
        <Button onClick={() => toggleBlock(editor, "center")} size="sm" p={1}>
          <FormatAlignCenterIcon />
        </Button>
        <Button onClick={() => toggleBlock(editor, "right")} size="sm" p={1}>
          <FormatAlignRightIcon />
        </Button>
      </Box>
      <Slate
        editor={editor}
        initialValue={initialValue || initialValueDefault}
        onChange={(newValue) => setValue(newValue)}
      >
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
