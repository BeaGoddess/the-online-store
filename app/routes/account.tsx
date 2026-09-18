import type { Route } from "./+types/account";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Account" }];
}

export default function Account() {
  return (
    <div className="my-6 flex w-full flex-col gap-4">
      <h1 className="text-primary text-[28px] leading-8 font-bold tracking-[-1%]">
        Account
      </h1>
      <p className="text-primary/70">Coming soon</p>
    </div>
  );
}
