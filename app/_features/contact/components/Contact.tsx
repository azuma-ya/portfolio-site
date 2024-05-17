import SectionLayout from "@/app/_components/layouts/section/SectionLayout";
import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <SectionLayout id="contact" title="CONTACT">
      <div className="px-24">
        <ContactForm />
      </div>
    </SectionLayout>
  );
};

export default Contact;
