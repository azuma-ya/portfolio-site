import React from "react";

import Link from "next/link";


import icon from "@/public/icon.jpg";

import { NextImage } from "../../ui-elements/iamge/NextImage";

const DetailHeader = () => {
  return (
    <header className="bg-white py-8">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">A</span>zuma-ya
          </h1>
        </Link>
        <div className="size-12 overflow-hidden rounded-full">
          <NextImage src={icon} alt="icon" />
        </div>
      </div>
    </header>
  );
};

export default DetailHeader;
