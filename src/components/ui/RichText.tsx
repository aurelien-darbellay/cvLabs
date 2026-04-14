import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type RichTextProps = {
  content: string;
  className?: string;
};

export function RichText({ content, className }: RichTextProps) {
  if (!content.trim()) {
    return null;
  }

  const wrapperClassName = className ? `rich-text ${className}` : "rich-text";

  return (
    <div className={wrapperClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-1 last:mb-0 list-disc pl-5 space-y-0.5">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-1 last:mb-0 list-decimal pl-5 space-y-0.5">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
