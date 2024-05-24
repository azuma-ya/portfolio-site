import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { MotionButton } from "../../ui-elements/Motion/MotionComponents";

const Header = () => {
  return (
    <header className="py-8 backdrop-blur-sm fixed z-40 w-full bg-accent/50 border-b-2">
      <div className="flex items-center justify-between container">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">A</span>zuma-ya
          </h1>
        </Link>
        <div className="gap-12 hidden md:flex">
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
          <MotionButton
            size="sm"
            asChild
            initial={{ scale: 0, rotate: 180 }}
            animate={{ rotate: 0, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
          >
            <Link href="#contact">CONTACT</Link>
          </MotionButton>
        </div>
        <Drawer direction={"left"}>
          <DrawerTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-full w-2/3 bg-card">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-2xl">Azuma-ya</DrawerTitle>
              <DrawerDescription>
                青山和樹のポートフォリオサイト
              </DrawerDescription>
            </DrawerHeader>
            <Separator />
            <div className="flex flex-col h-full mt-8 self-center">
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" asChild className="">
                  <Link href="#works">WORKS</Link>
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" asChild className="">
                  <Link href="#skills">SKILLS</Link>
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" asChild className="">
                  <Link href="#artworks">ARTWORKS</Link>
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" asChild className="">
                  <Link href="#blog">BLOG</Link>
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button size="sm" asChild className="">
                  <Link href="#contact">CONTACT</Link>
                </Button>
              </DrawerClose>
            </div>
            <Separator />
            <DrawerFooter className="pt-2">
              <p className="text-sm italic">
                このポートフォリオサイトにお越し頂きありがとうございます!
              </p>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
