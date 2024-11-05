import Highlight from "@/components/static/Hightlight";
import { RoughNotationGroup } from "react-rough-notation";
import {
  BiLogoJavascript,
  BiLogoTypescript,
  BiLogoTailwindCss,
  BiLogoReact,
} from "react-icons/bi";

import Badge from "../components/static/Badge";
const randomWord = [
  "classy",
  "excellent",
  "wonderful",
  "marvelous",
  "superb",
  "splendid",
  "lovely",
  "delightful",
  "snazzy",
  "fantastic",
  "groovy",
];

const locale = window.navigator.language || window.navigator.languages[0];

export default function Home() {
  return (
    <RoughNotationGroup show={true}>
      <div className="flex flex-col z-10 font-geist">
        <h1 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mt-12 sm:mt-16">
          hello world,{" "}
          <Highlight type="underline" order="1">
            jason
          </Highlight>{" "}
          here{" "}
        </h1>
        <p className="text-xs mt-2 font-medium text-neutral-400 dark:text-neutral-500">
          he/him
        </p>
        <p className="mt-10 font-medium text-neutral-700 dark:text-neutral-200">
          I'm a computer science graduate from Hunter College in NYC (May 2023).
          I have a passion for{" "}
          <Highlight type="highlight" order="2">
            frontend development
          </Highlight>{" "}
          and{" "}
          <Highlight type="highlight" order="3">
            software engineering
          </Highlight>
          , learning new skills and building cool things.
        </p>
        <br />
        <p className="font-medium text-neutral-700 dark:text-neutral-200">
          My go to{" "}
          <Highlight order="4" type="box">
            tech stack
          </Highlight>{" "}
          when working on new projects include{" "}
          <Badge
            text={"React"}
            icon={<BiLogoReact className="mr-1 -ml-0.5 text-[#66dbfb]" />}
          />
          ,{" "}
          <Badge
            text={"Javascript"}
            icon={<BiLogoJavascript className="mr-1 -ml-0.5 text-[#f7e018]" />}
          />
          ,{" "}
          <Badge
            text={"Typescript"}
            icon={<BiLogoTypescript className="mr-1 -ml-0.5 text-[#377cc8]" />}
          />
          , and{" "}
          <Badge
            text={"Tailwind"}
            icon={<BiLogoTailwindCss className="mr-1 -ml-0.5 text-[#1cc3ba]" />}
          />
          though, I'm always looking to expand my skillset and try emerging
          tech.
        </p>
        <br />
        <p className="font-medium text-neutral-700 dark:text-neutral-200">
          When I'm not building the{" "}
          <Highlight type="crossed-off" order="5">
            next big thing
          </Highlight>
          , you can find me fragging out on valorant, filling up on good food or
          getting my sets in at the gym.
        </p>
        <br />
        <p className="font-medium text-neutral-700 dark:text-neutral-200">
          I'm still very early on in my professional journey and have much more
          to learn. I'm always open to exploring new opportunities and cool
          things to work on, connect with me{" "}
          <Highlight type="circle" order="6">
            <a href="mailto:wongjason195@gmail.com">here</a>
          </Highlight>
          .
        </p>
        <p className="font-medium mt-10 text-neutral-700 dark:text-neutral-200">
          Have a{" "}
          <Highlight type="highlight" order="7">
            {randomWord[Math.floor(Math.random() * randomWord.length)]}
          </Highlight>{" "}
          {new Date().toLocaleDateString(locale, { weekday: "long" })} ツ
        </p>
        <p className="font-medium text-neutral-700 dark:text-neutral-200">
          {`\u2014`} Jason Wong
        </p>
      </div>
    </RoughNotationGroup>
  );
}
