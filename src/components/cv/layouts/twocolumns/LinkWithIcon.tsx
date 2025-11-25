import React from "react";

interface LinkWithIconProps {
  icon: React.ReactNode;
  href?: string;
  textClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({
  icon,
  href,
  textClassName,
  className,
  children,
}) => {
  const contentClass = textClassName ? textClassName : "";
  const wrapperClass = "flex items-center gap-2";

  return (
    <div className={wrapperClass}>
      {icon}
      {href ? (
        <a
          href={href}
          className={`hover:text-slate-200 transition-colors ${contentClass}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <span className={contentClass}>{children}</span>
      )}
    </div>
  );
};
