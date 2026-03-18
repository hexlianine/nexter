"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "./theme-provider";

const EXT_TO_LANG: Record<string, string> = {
  ".ts": "typescript",
  ".tsx": "tsx",
  ".js": "javascript",
  ".jsx": "jsx",
  ".css": "css",
  ".json": "json",
  ".md": "markdown",
};

function getLanguage(filePath: string): string {
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  return EXT_TO_LANG[ext] ?? "plaintext";
}

type Props = {
  code: string;
  filePath: string;
};

export default function CodePreview({ code, filePath }: Props) {
  const language = getLanguage(filePath);
  const { theme } = useTheme();
  const prismTheme = theme === "dark" ? themes.nightOwl : themes.github;

  return (
    <Highlight
      theme={prismTheme}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} code-preview`}
          style={style}
          aria-label={`Source code for ${filePath}`}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
