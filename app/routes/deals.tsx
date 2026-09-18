import type { Route } from "./+types/deals";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Deals" }];
}

export default function Deals() {
  return (
    <div className="my-6 flex w-full flex-col gap-4">
      <h1 className="text-primary text-[28px] leading-8 font-bold tracking-[-1%]">
        Deals
      </h1>
      <p className="text-primary/70">Coming soon</p>
    </div>
  );
}
