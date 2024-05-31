import React from "react";

import { twMerge } from "tailwind-merge";

const SectionLayout = async ({
  id,
  title,
  subtitle,
  children,
  sectionButton,
  className,
}: Readonly<{
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  sectionButton?: React.ReactNode;
  className?: string;
}>) => {
  return (
    <section id={id} className={twMerge("w-full", className)}>
      <div className="mb-16 flex w-full items-center justify-between">
        <div className="flex flex-col items-center">
          <h2 className="inline grow-0 text-3xl font-semibold leading-none">
            <span className="text-primary">{title.substring(0, 1)}</span>
            {title.substring(1)}
          </h2>
          {subtitle && <p className="leading-none">{subtitle}</p>}
        </div>
        {sectionButton}
      </div>
      {children}
    </section>
  );
};

export default SectionLayout;
