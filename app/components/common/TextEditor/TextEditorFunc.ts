import { Editor, Element, Transforms, BaseEditor } from "slate";

export const toggleBlock = (editor: BaseEditor, format: string) => {
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

export const isListActive = (editor: BaseEditor) => {
  return isBlockActive(editor, "bulleted-list") || isBlockActive(editor, "numbered-list");
};

export const isBlockActive = (
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

export const toggleMark = (editor: BaseEditor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean> | undefined;
  return marks ? marks[format] === true : false;
};
