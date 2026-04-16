export type StripeGivingConfig = {
  oneTimeUrl: string | null;
  monthlyUrl: string | null;
};

function readUrl(name: "STRIPE_GIVE_ONE_TIME_URL" | "STRIPE_GIVE_MONTHLY_URL") {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getStripeGivingConfig(): StripeGivingConfig {
  return {
    oneTimeUrl: readUrl("STRIPE_GIVE_ONE_TIME_URL"),
    monthlyUrl: readUrl("STRIPE_GIVE_MONTHLY_URL"),
  };
}
