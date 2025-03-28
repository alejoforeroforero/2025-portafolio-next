import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from "lexical";
import type { JSX } from "react";

import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents";
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";
import * as React from "react";

type UserNodeComponentProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  userId: string;
}>;

function UserComponent({
  className,
  format,
  nodeKey,
  userId,
}: UserNodeComponentProps) {
 
  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      <div>{JSON.parse(userId).name}</div>
    </BlockWithAlignableContents>
  );
}

export type SerializedUserNode = Spread<
  {
    userId: string;
  },
  SerializedDecoratorBlockNode
>;

function $convertUserElement(
  domNode: HTMLElement
): null | DOMConversionOutput {
  const userId = domNode.getAttribute("data-lexical-user");

  if (userId) {
    const node = $createUserNode(userId);
    return { node };
  }
  return null;
}

export class UserNode extends DecoratorBlockNode {
  __id: string;

  static getType(): string {
    return "user";
  }

  static clone(node: UserNode): UserNode {
    return new UserNode(node.__id, node.__format, node.__key);
  }

  static importJSON(serializedNode: SerializedUserNode): UserNode {
    return $createUserNode(serializedNode.userId).updateFromJSON(
      serializedNode
    );
  }

  exportJSON(): SerializedUserNode {
    return {
      ...super.exportJSON(),
      userId: this.__id,
    };
  }

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__id = id;
  }

  exportDOM(): DOMExportOutput {
   
    const element = document.createElement("div");
    element.setAttribute("data-lexical-user", this.__id);
    element.innerHTML = this.__id;
    return { element };

    // element.setAttribute("data-lexical-youtube", this.__id);
    // element.setAttribute("width", "560");
    // element.setAttribute("height", "315");
    // element.setAttribute(
    //   "src",
    //   `https://www.youtube-nocookie.com/embed/${this.__id}`
    // );
    // element.setAttribute("frameborder", "0");
    // element.setAttribute(
    //   "allow",
    //   "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    // );
    // element.setAttribute("allowfullscreen", "true");
    // element.setAttribute("title", "YouTube video");
    // return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-lexical-user")) {
          return null;
        }
        return {
          conversion: $convertUserElement,
          priority: 1,
        };
      },
    };
    return null;
  }

  updateDOM(): false {
    return false;
  }

  getId(): string {
    return this.__id;
  }

  getTextContent(): string {
    return `https://www.youtube.com/watch?v=${this.__id}`;
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || "",
      focus: embedBlockTheme.focus || "",
    };
    return (
      <UserComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        userId={this.__id}
      />
    );
  }
}

export function $createUserNode(userId: string): UserNode {
  return new UserNode(userId);
}

export function $isUserNode(
  node: UserNode | LexicalNode | null | undefined
): node is UserNode {
  return node instanceof UserNode;
}
