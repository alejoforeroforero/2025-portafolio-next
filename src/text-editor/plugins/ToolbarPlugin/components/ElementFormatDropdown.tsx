
'use client';
import type { JSX } from "react";
import DropDown, { DropDownItem } from "../../../ui/DropDown/DropDown";
import Divider from "../../../ui/General/Divider";

import { SHORTCUTS } from "../../ShortcutsPlugin/shortcuts";

import {
    FORMAT_ELEMENT_COMMAND,   
    INDENT_CONTENT_COMMAND,
    OUTDENT_CONTENT_COMMAND,
    LexicalEditor,
    ElementFormatType,
  } from "lexical";

const ELEMENT_FORMAT_OPTIONS: {
    [key in Exclude<ElementFormatType, "">]: {
      icon: string;
      iconRTL: string;
      name: string;
    };
  } = {
    center: {
      icon: "center-align",
      iconRTL: "center-align",
      name: "Center Align",
    },
    end: {
      icon: "right-align",
      iconRTL: "left-align",
      name: "End Align",
    },
    justify: {
      icon: "justify-align",
      iconRTL: "justify-align",
      name: "Justify Align",
    },
    left: {
      icon: "left-align",
      iconRTL: "left-align",
      name: "Left Align",
    },
    right: {
      icon: "right-align",
      iconRTL: "right-align",
      name: "Right Align",
    },
    start: {
      icon: "left-align",
      iconRTL: "right-align",
      name: "Start Align",
    },
  };
  

export default function ElementFormatDropdown({
    editor,
    value,
    isRTL,
    disabled = false,
  }: {
    editor: LexicalEditor;
    value: ElementFormatType;
    isRTL: boolean;
    disabled: boolean;
  }): JSX.Element {
    const formatOption = ELEMENT_FORMAT_OPTIONS[value || "left"];
  
    return (
      <DropDown
        disabled={disabled}
        buttonLabel={formatOption.name}
        buttonIconClassName={`icon ${
          isRTL ? formatOption.iconRTL : formatOption.icon
        }`}
        buttonClassName="toolbar-item spaced alignment"
        buttonAriaLabel="Formatting options for text alignment"
      >
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
          className="item wide"
        >
          <div className="icon-text-container">
            <i className="icon left-align" />
            <span className="text">Left Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.LEFT_ALIGN}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
          className="item wide"
        >
          <div className="icon-text-container">
            <i className="icon center-align" />
            <span className="text">Center Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.CENTER_ALIGN}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
          className="item wide"
        >
          <div className="icon-text-container">
            <i className="icon right-align" />
            <span className="text">Right Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.RIGHT_ALIGN}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
          className="item wide"
        >
          <div className="icon-text-container">
            <i className="icon justify-align" />
            <span className="text">Justify Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.JUSTIFY_ALIGN}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "start");
          }}
          className="item wide"
        >
          <i
            className={`icon ${
              isRTL
                ? ELEMENT_FORMAT_OPTIONS.start.iconRTL
                : ELEMENT_FORMAT_OPTIONS.start.icon
            }`}
          />
          <span className="text">Start Align</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "end");
          }}
          className="item wide"
        >
          <i
            className={`icon ${
              isRTL
                ? ELEMENT_FORMAT_OPTIONS.end.iconRTL
                : ELEMENT_FORMAT_OPTIONS.end.icon
            }`}
          />
          <span className="text">End Align</span>
        </DropDownItem>
        <Divider />
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
          }}
          className="item wide"
        >
          <div className="icon-text-container">
            <i className={"icon " + (isRTL ? "indent" : "outdent")} />
            <span className="text">Outdent</span>
          </div>
          <span className="shortcut">{SHORTCUTS.OUTDENT}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
          }}
          className="item wide"
        >
          <div className="icon-text-container">
            <i className={"icon " + (isRTL ? "outdent" : "indent")} />
            <span className="text">Indent</span>
          </div>
          <span className="shortcut">{SHORTCUTS.INDENT}</span>
        </DropDownItem>
      </DropDown>
    );
  }
  