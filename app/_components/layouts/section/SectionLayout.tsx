import { Button } from "@/components/ui/button";
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
      <div className="flex justify-between items-center w-full mb-16">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold leading-none grow-0 inline">
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
