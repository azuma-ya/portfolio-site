import SectionLayout from "@/app/_components/layouts/section/SectionLayout";
import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <SectionLayout id="contact" title="CONTACT">
      <div className="max-w-4xl mx-auto z-50">
        <ContactForm />
      </div>
    </SectionLayout>
  );
};

export default Contact;
