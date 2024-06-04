"use client";

import React, { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MotionButton } from "@/app/_components/ui-elements/Motion/MotionComponents";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import { sendMail } from "../action";

export const formSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "件名を入力してください" })
    .max(20, { message: "20文字以内で入力してください" }),
  name: z
    .string()
    .min(1, { message: "名前を入力してください" })
    .max(20, { message: "20文字以内で入力してください" }),
  email: z
    .string({ required_error: "メールアドレスを入力してください" })
    .email({ message: "正しいメールアドレスを入力してください" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(200, { message: "200文字以内で入力してください" }),
});

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      name: "",
      email: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const res = await sendMail(data);
      console.log(res);
      if (res.status === 200) {
        toast({
          title: "メールの送信に完了しました!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "メールの送信に失敗しました...",
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>件名</FormLabel>
              <FormControl>
                <Input placeholder="subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>内容</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="content"
                  {...field}
                  className="h-48 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MotionButton
          type="submit"
          disabled={isPending}
          className="mx-auto block px-16"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
        >
          SUBMIT
        </MotionButton>
      </form>
    </Form>
  );
};

export default ContactForm;
