import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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

import { MotionButton } from "../../ui-elements/Motion/MotionComponents";

const Header = () => {
  return (
    <header className="fixed z-40 w-full border-b-2 bg-accent/50 py-8 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            <span className="text-primary">A</span>zuma-ya
          </h1>
        </Link>
        <div className="hidden gap-12 md:flex">
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
        <Drawer direction="left">
          <DrawerTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <ChevronRight className="size-4" />
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
            <div className="mt-8 flex h-full flex-col self-center">
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
