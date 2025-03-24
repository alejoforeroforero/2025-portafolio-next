"use client";
import { LexicalEditor } from "lexical";
import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";
import DropDown, { DropDownItem } from "../../../ui/DropDown/DropDown";
import { EmbedConfigs } from "../../AutoEmbedPlugin";

export const InsertDropDown = ({
  editor,
  isEditable,
}: {
  editor: LexicalEditor;
  isEditable: boolean;
}) => {
  return (
    <DropDown
      disabled={!isEditable}
      buttonClassName="toolbar-item spaced"
      buttonLabel="Insert"
      buttonAriaLabel="Insert specialized editor node"
      buttonIconClassName="icon plus"
    >
      {EmbedConfigs.map((embedConfig) => (
        <DropDownItem
          key={embedConfig.type}
          onClick={() => {
            editor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type);
          }}
          className="item"
        >
          {embedConfig.icon}
          <span className="text">{embedConfig.contentName}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
};
