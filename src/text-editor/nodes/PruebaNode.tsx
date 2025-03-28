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

import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";
import * as React from "react";

type PruebaComponentProps = Readonly<{
  className: string;
  nodeKey: NodeKey;
  userId: string;
}>;

function PruebaComponent({ className, nodeKey, userId }: PruebaComponentProps) {
  return (
    <div
      className={`${className} bg-blue-100 p-4 rounded-lg shadow-md hover:bg-blue-200 transition-colors`}
      data-lexical-node-key={nodeKey}
    >
      {userId}
    </div>
  );
}

export type SerializedPruebaNode = Spread<
  {
    userId: string;
  },
  SerializedDecoratorBlockNode
>;

function $convertPruebaElement(
  domNode: HTMLElement
): null | DOMConversionOutput {
  const text = domNode.getAttribute("data-lexical-prueba");
  if (text) {
    const node = $createPruebaNode(text);
    return { node };
  }
  return null;
}

export class PruebaNode extends DecoratorBlockNode {
  __text: string;

  static getType(): string {
    return "prueba";
  }

  static clone(node: PruebaNode): PruebaNode {
    return new PruebaNode(node.__text, node.__format, node.__key);
  }

  static importJSON(serializedNode: SerializedPruebaNode): PruebaNode {
    return $createPruebaNode(serializedNode.userId).updateFromJSON(
      serializedNode
    );
  }

  exportJSON(): SerializedPruebaNode {
    return {
      ...super.exportJSON(),
      userId: this.__text,
      type: "prueba",
      version: 1,
    };
  }

  constructor(text: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__text = text;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.setAttribute("data-lexical-prueba", this.__text);
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-lexical-prueba")) {
          return null;
        }
        return {
          conversion: $convertPruebaElement,
          priority: 1,
        };
      },
    };
  }

  updateDOM(): false {
    return false;
  }

  getText(): string {
    return this.__text;
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <PruebaComponent
        className={config.theme.prueba || ""}
        nodeKey={this.getKey()}
        userId={this.__text}
      />
    );
  }
}

export function $createPruebaNode(text: string): PruebaNode {
  return new PruebaNode(text);
}

export function $isPruebaNode(
  node: PruebaNode | LexicalNode | null | undefined
): node is PruebaNode {
  return node instanceof PruebaNode;
}
