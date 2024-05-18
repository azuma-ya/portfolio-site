import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { NextImage } from "../../ui-elements/iamge/NextImage";
import icon from "@/public/icon.jpg";

const DetailHeader = () => {
  return (
    <header className="bg-white py-8">
      <div className="flex items-center justify-between container">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">A</span>zuma-ya
          </h1>
        </Link>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <NextImage src={icon} alt="icon" />
        </div>
      </div>
    </header>
  );
};

export default DetailHeader;
