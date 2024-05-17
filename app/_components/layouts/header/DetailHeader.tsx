import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DetailHeader = () => {
  return (
    <header className="flex items-center justify-between container my-8">
      <Link href="/">
        <h1 className="text-4xl font-bold">
          <span className="text-primary">A</span>zuma-ya
        </h1>
      </Link>
      <div className="flex gap-12">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#works">WORKS</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#skills">SKILLS</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#artworks">ARTWORKS</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#blog">BLOG</Link>
          </Button>
        </div>
        <Button size="sm" asChild>
          <Link href="#contact">CONTACT</Link>
        </Button>
      </div>
    </header>
  );
};

export default DetailHeader;
