"use server";

import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import type { z } from "zod";

import type { formSchema } from "./components/ContactForm";

export const sendMail = async (data: z.infer<typeof formSchema>) => {
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  const { subject, email, content } = data;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: email,
    to: process.env.NODEMAILER_EMAIL,
    subject: `[あずまやポートフォリオサイト] ${subject}`,
    html: `
    <h1>${subject}</h1>
    <div>${content}</div>
    <br/>
    <p>送信元: ${email}</p>`,
  };

  try {
    await transport.sendMail(mailOptions);
    return { message: "Success!", status: 200 };
  } catch (err) {
    return { message: "Failed!", status: 500 };
  }
};
