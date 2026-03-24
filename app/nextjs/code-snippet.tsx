"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "../ui/theme-provider";

type CodeSnippetProps = {
  code: string;
  language?: string;
};

export default function CodeSnippet({
  code,
  language = "tsx",
}: CodeSnippetProps) {
  const { theme } = useTheme();
  const prismTheme = theme === "dark" ? themes.nightOwl : themes.github;

  return (
    <div className="gb-code-block">
      <div className="gb-code-header">
        <span className="gb-code-lang">{language}</span>
      </div>
      <Highlight theme={prismTheme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} gb-code-body`} style={style}>
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
    </div>
  );
}
