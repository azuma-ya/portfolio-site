import SectionLayout from "@/components/layouts/section/SectionLayout";

import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <SectionLayout id="contact" title="CONTACT">
      <div className="z-50 mx-auto max-w-4xl">
        <ContactForm />
      </div>
    </SectionLayout>
  );
};

export default Contact;
