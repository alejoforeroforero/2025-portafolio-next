

import React, { JSX } from 'react';

import { ReactUserNode } from "./react-nodes/ReactUserNode";

interface BaseNode {
    type: string;
    version: 1;
    format: string | number;
    indent?: number;
    direction?: string | null;
    children?: Node[];
  }
  
  interface RootNode extends BaseNode {
    type: "root";
    children: Node[];
  }
  
  interface TextNode extends BaseNode {
    type: "text";
    detail: number;
    mode: "normal";
    style: string;
    text: string;
    format: number;
  }
  
  interface ParagraphNode extends BaseNode {
    type: "paragraph";
    textFormat: number;
    textStyle: string;
  }
  
  interface HeadingNode extends BaseNode {
    type: "heading";
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }
  
  interface YouTubeNode extends BaseNode {
    type: "youtube";
    videoID: string;
  }
  
 
  
  interface ListNode extends BaseNode {
    type: "list";
    listType: "bullet" | "number" | "check";
  }
  
  interface ListItemNode extends BaseNode {
    type: "listitem";
    nested?: boolean;
    checked?: boolean;
  }
  
  interface QuoteNode extends BaseNode {
    type: "quote";
  }
  
  interface LinkNode extends BaseNode {
    type: "link";
    url: string;
  }
  
  interface ImageNode extends BaseNode {
    type: "image";
    src: string;
    altText: string;
    width?: number | "inherit";
    height?: number | "inherit";
    maxWidth?: number;
    showCaption?: boolean;
    caption?: EditorState;
  }
  
  interface UserNode extends BaseNode {
    type: "user";
    userId: string;
    className?: string;
    style?: string;
  }
  
  type Node =
    | RootNode
    | TextNode
    | ParagraphNode
    | HeadingNode
    | YouTubeNode
    | ListNode
    | ListItemNode
    | QuoteNode
    | LinkNode
    | ImageNode
    | UserNode;  
  
  interface EditorState {
    root: RootNode;
  }

export const showEditorContent = (jsonText: string) => {
  try {
    const editorState: EditorState = JSON.parse(jsonText);
    // Ensure we're not conditionally rendering hooks
    return (
      <div className="editor-content">
        {generateHTML(editorState.root)}
      </div>
    );
  } catch (error) {
    console.error("Error converting to HTML:", error);
    return <div className="error-content">Error processing content</div>;
  }
};

function generateHTML(node: Node): JSX.Element | JSX.Element[] | string {
  if (!node) return "";

  switch (node.type) {
    case "root": {
      return (
        <div className="editor-root">
          {node.children?.map((child, index) => (
            <React.Fragment key={index}>
              {generateHTML(child)}
            </React.Fragment>
          ))}
        </div>
      );
    }

    case "paragraph": {
      const classes = ["editor-paragraph"];
      if (node.direction === "ltr") classes.push("ltr");
      if (node.direction === "rtl") classes.push("rtl");
      if (node.indent) classes.push(`editor-indent-${node.indent}`);

      const style = node.textStyle ? { style: parseStyle(node.textStyle) } : {};

      return (
        <p className={classes.join(" ")} {...style}>
          {node.children?.map((child, index) => (
            <React.Fragment key={index}>
              {generateHTML(child)}
            </React.Fragment>
          )) || "\u00A0"}
        </p>
      );
    }

    case "text": {
      const content = node.text;
      const classes: string[] = [];

      // Apply text formatting
      if (node.format) {
        if (node.format & 1) classes.push("editor-text-bold");
        if (node.format & 2) classes.push("editor-text-italic");
        if (node.format & 4) classes.push("editor-text-underline");
        if (node.format & 8) classes.push("editor-text-strikethrough");
        if (node.format & 16) classes.push("editor-text-code");
      }

      const style = node.style ? { style: parseStyle(node.style) } : {};

      return classes.length > 0 || node.style ? (
        <span className={classes.join(" ")} {...style}>
          {content}
        </span>
      ) : (
        content
      );
    }

    case "user": {
        const { type, userId, className, style } = node;
        return <ReactUserNode 
            type={type}
            version={1}
            format={node.format}
            userId={userId}
            className={className}
            style={style}
        />;
    }

    default:
      return "";
  }
}

// const GenerateUserHTML = (node: UserNode): JSX.Element => {

//     const [user, setUser] = useState<{
//         id: string;
//         email: string;
//         name: string;
//         occupation: string | null;
//         profile: string;
//     } | null>(null);

//     useEffect(() => {
//         let isSubscribed = true;
        
//         const fetchUser = async () => {
//             try {
//                 const userData = JSON.parse(node.userId);
//                 const fetchedUser = await getUserById(userData.id);
//                 if (isSubscribed) {
//                     setUser(fetchedUser);
//                 }
//             } catch (error) {
//                 console.error("Error parsing user data:", error);
//             }
//         };

//         fetchUser();

//         return () => {
//             isSubscribed = false;
//         };
//     }, [node.userId]);

//     const classes = node.className || '';

//     const style = node.style ? parseStyle(node.style) : {};

//     return (
//         <div className={classes} style={style}>
//             <div>{user?.name || 'Loading...'}</div>
//         </div>
//     );
// }; // Helper function to parse style strings
function parseStyle(styleString: string): React.CSSProperties {
  if (!styleString) return {};
  
  return styleString.split(';')
    .filter(style => style.trim())
    .reduce((acc, style) => {
      const [property, value] = style.split(':').map(str => str.trim());
      const camelCaseProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
      return { ...acc, [camelCaseProperty]: value };
    }, {});
}
