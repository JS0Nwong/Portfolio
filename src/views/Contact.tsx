import { useState } from "react";
import {
  RxEnvelopeOpen,
  RxLinkedinLogo,
  RxGithubLogo,
  RxDiscordLogo,
  RxFileText,
} from "react-icons/rx";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import Input from "../components/static/Input";

type BadgeType = {
    text: string;
    icon: JSX.Element;
    link: string;
}

const contactMethods = [
  {
    typeOfMethod: "Email",
    icon: <RxEnvelopeOpen className="mr-2 text-[#5f58ff]" />,
    linkTo: "mailto:wongjason195@gmail.com",
  },
  {
    typeOfMethod: "LinkedIn",
    icon: <RxLinkedinLogo className="mr-2 text-[#5f58ff]" />,
    linkTo: "https://linkedin.com/in/jason-wong-/",
  },
  {
    typeOfMethod: "Discord",
    icon: <RxDiscordLogo className="mr-2 text-[#5f58ff]" />,
    linkTo: "#",
  },
  {
    typeOfMethod: "Github",
    icon: <RxGithubLogo className="mr-2 text-[#5f58ff]" />,
    linkTo: "https://github.com/JS0Nwong/",
  },
];

const Badge = ({ text, icon, link } : BadgeType) => {
  return (
    <Link
      to={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-transparent text-neutral-900 text-sm font-medium me-0.5 px-3 py-2 rounded-md dark:text-neutral-200 border border-1 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-100"
    >
      {icon}
      {text}
    </Link>
  );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData?.get("name");
    const email = formData?.get("email");
    const message = formData?.get("message");

    if (!name || !email || !message) {
      alert("Please fill out all fields");
      return;
    }
    const newMessage = {
      message,
      email,
      name,
      timestamp: new Date(),
    };

    const contactMessageRef = collection(db, "contact");

    await addDoc(contactMessageRef, newMessage).then(() => {
      const nameInput = document.getElementById("name") as HTMLInputElement | null;
      const emailInput = document.getElementById("email") as HTMLInputElement | null;
      const messageInput = document.getElementById("message") as HTMLTextAreaElement | null;

      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (messageInput) messageInput.value = "";
      setIsSubmitting(false);
      return;
    });
  };

  return (
    <div className="pt-12 md:pt-16 flex flex-col font-geist">
      <h1 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-100">
        contact me
      </h1>
      <p className="text-xs mt-2 font-medium text-neutral-400 dark:text-neutral-500">
        open to work, questions, comments and concerns
      </p>
      <ul className="mt-10 grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-1">
        {contactMethods.map((method, index) => (
          <Badge
            key={index}
            text={method.typeOfMethod}
            icon={method.icon}
            link={method.linkTo}
          />
        ))}
        <a
          href="./Resume.pdf"
          className="inline-flex items-center bg-transparent text-neutral-900 text-sm font-medium me-0.5 px-3 py-2 rounded-md dark:text-neutral-100 border border-1 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-100"
        >
          <RxFileText className="mr-2 text-[#5f58ff]" /> Resume
        </a>
      </ul>
      <form onSubmit={handleSubmit} className="font-medium w-full">
        <div className="mt-10 flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
          >
            Name
          </label>
          <Input type={"text"} id={"name"} name={"name"} placeholder={"Name"} />
        </div>
        <div className="mt-5 flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
          >
            Email
          </label>
          <Input
            type={"email"}
            id={"email"}
            name={"email"}
            placeholder={"Email"}
          />
        </div>
        <div className="mt-5 flex flex-col">
          <label
            htmlFor="message"
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            rows={8}
            className="mt-2 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded  text-neutral-800 dark:text-neutral-200 bg-transparent placeholder:text-sm text-sm placeholder:text-neutral-400"
          />
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full mt-5 px-5 py-2 bg-[#5f58ff] text-neutral-100 text-sm font-medium rounded-md disabled:opacity-50 hover:bg-[#4f48e6] transition-colors duration-100"
        >
          Send
        </button>
      </form>
    </div>
  );
}
