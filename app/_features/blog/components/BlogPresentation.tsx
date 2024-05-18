"use client";

import { MotionDiv } from "@/app/_components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import { Blog } from "@/app/_types/blog";
import { Skill } from "@/app/_types/skill";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export interface BlogPresentationProps {
  blogs: Blog[];
  skills: Skill[];
}

const BlogPresentation = ({ blogs, skills }: BlogPresentationProps) => {
  const [open, setOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<
    (Skill & { toggle: boolean })[]
  >([]);

  return (
    <div>
      <div className="flex my-16 gap-4 max-w-6xl mx-auto">
        {selectedSkills.map((skill, index) => (
          <MotionDiv
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Toggle
              defaultPressed={skill.toggle}
              className="rounded-full"
              onPressedChange={(toggle: boolean) =>
                setSelectedSkills(
                  selectedSkills.map((selectedSkill) =>
                    selectedSkill.id === skill.id
                      ? { ...selectedSkill, toggle: toggle }
                      : selectedSkill
                  )
                )
              }
            >
              {skill.title}
            </Toggle>
          </MotionDiv>
        ))}
        <MotionDiv
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className=""
                // size="icon"
              >
                {/* <Plus /> */}
                add tags
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {skills.map((skill, index) => (
                      <CommandItem
                        key={index}
                        value={skill.title}
                        onSelect={(currentValue) => {
                          if (
                            !selectedSkills.find(
                              (skill) => skill.title === currentValue
                            )
                          ) {
                            setSelectedSkills([
                              ...selectedSkills,
                              {
                                ...(skills.find(
                                  (skill) => skill.title === currentValue
                                ) as Skill),
                                toggle: true,
                              },
                            ]);
                          } else {
                            setSelectedSkills(
                              selectedSkills.filter(
                                (selectedSkill) =>
                                  selectedSkill.title !== currentValue
                              )
                            );
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSkills
                              .map((skill) => skill.title)
                              .includes(skill.title)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {skill.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </MotionDiv>
      </div>
      <div className="max-w-6xl mx-auto mb-32 grid sm:grid-cols-2 gap-8 grid-cols-1">
        {blogs
          .filter(
            (blog) =>
              (selectedSkills.length > 0 &&
                selectedSkills
                  .filter((skill) => skill.toggle)
                  .some((selectedSkill) =>
                    blog.skills
                      .map((skill: any) => skill.id)
                      .includes(selectedSkill.id)
                  )) ||
              selectedSkills.length === 0
          )
          .map((blog, index) => (
            <Link href={`/blog/${blog.id}`} key={index} className="flex gap-4">
              <div className="w-32 h-32 flex-none rounded-xl overflow-hidden">
                <NextImage src={blog.image[0]} alt={blog.description} />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className=""> {blog.description}</p>
                <p className="text-primary">
                  {blog.createdAt?.toLocaleDateString("ja-JP")}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BlogPresentation;
