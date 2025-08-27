type Provider = "github" | "gmail";

export type AuthButtonProps = {
  provider: Provider;
  icon: React.ReactNode;
  label: string;
};