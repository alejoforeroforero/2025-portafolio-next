import { ParagraphNode, TextNode } from "lexical";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { YouTubeNode } from "../YouTubeNode";

export const editorNodes = [
  ParagraphNode,
  TextNode,
  HeadingNode,
  QuoteNode,
  YouTubeNode,
  LinkNode,
  AutoLinkNode,
  ListNode,
  ListItemNode,
];
