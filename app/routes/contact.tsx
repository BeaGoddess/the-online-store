import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Contact" }];
}

export default function Contact() {
  return (
    <div className="my-6 flex w-full flex-col gap-4">
      <h1 className="text-primary text-[28px] leading-8 font-bold tracking-[-1%]">
        Contact
      </h1>
      <p className="text-primary/70">Coming soon</p>
    </div>
  );
}
