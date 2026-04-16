"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Globe2,
  Heart,
  Loader2,
  MapPin,
  QrCode,
  Smartphone,
  Wallet,
} from "lucide-react";
import { GivePageData } from "@/sanity/lib/give-page";

type GivingRoute = "philippines" | "international";
type PaymentMethod = "gcash" | "maya" | "qrph" | "card";

const localPaymentOptions: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
}[] = [
  {
    id: "gcash",
    label: "GCash",
    description: "Local e-wallet giving through PayMongo checkout.",
    icon: Smartphone,
  },
  {
    id: "maya",
    label: "Maya",
    description: "PayMaya/Maya wallet giving through PayMongo.",
    icon: Wallet,
  },
  {
    id: "qrph",
    label: "QRPh",
    description: "Scan-to-pay option for supported Philippine bank and wallet apps.",
    icon: QrCode,
  },
  {
    id: "card",
    label: "Card",
    description: "Visa or Mastercard through PayMongo.",
    icon: CreditCard,
  },
];

const envPaymongoEndpoint = process.env.NEXT_PUBLIC_PAYMONGO_GIVING_ENDPOINT?.trim();
const envPaymongoGivingLink = process.env.NEXT_PUBLIC_PAYMONGO_GIVING_LINK?.trim();
const envWiseGivingLink = process.env.NEXT_PUBLIC_WISE_GIVING_LINK?.trim();

function buildUrlWithParams(url: string, params: Record<string, string>) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${new URLSearchParams(params).toString()}`;
}

function formatAmount(value: string | number, currency: string) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface GivingPageClientProps {
  data: GivePageData;
}

export default function GivingPageClient({ data }: GivingPageClientProps) {
  const [route, setRoute] = useState<GivingRoute>("philippines");
  const [amount, setAmount] = useState(String(data.localQuickAmounts[0] || "500"));
  const [customAmount, setCustomAmount] = useState("");
  const [fund, setFund] = useState(data.funds[0] || "Tithes");
  const [method, setMethod] = useState<PaymentMethod>("gcash");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedAmount = customAmount || amount;
  const currency = route === "philippines" ? "PHP" : "USD";
  const formattedAmount = formatAmount(selectedAmount, currency);
  const quickAmounts = route === "philippines" ? data.localQuickAmounts : data.internationalQuickAmounts;

  const paymentConfig = useMemo(() => {
    return {
      paymongoEndpoint: data.paymongoGivingEndpoint || envPaymongoEndpoint || "",
      paymongoGivingLink: data.paymongoGivingLink || envPaymongoGivingLink || "",
      wiseGivingLink: data.wiseGivingLink || envWiseGivingLink || "",
    };
  }, [data.paymongoGivingEndpoint, data.paymongoGivingLink, data.wiseGivingLink]);

  const switchRoute = (nextRoute: GivingRoute) => {
    setRoute(nextRoute);
    setCustomAmount("");

    if (nextRoute === "philippines") {
      setAmount(String(data.localQuickAmounts[0] || "500"));
      setMethod("gcash");
    } else {
      setAmount(String(data.internationalQuickAmounts[0] || "25"));
    }
  };

  const openPayMongo = async () => {
    const payload = {
      amount: Number(selectedAmount),
      currency: "PHP",
      fund,
      donorName,
      donorEmail,
      note,
      method,
      source: "church-web-cms",
    };

    if (paymentConfig.paymongoEndpoint) {
      const response = await fetch(paymentConfig.paymongoEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const checkoutUrl = result.checkoutUrl || result.redirectUrl || result.nextActionUrl;

      if (!response.ok || !checkoutUrl) {
        throw new Error(result.error || "PayMongo checkout is not available yet.");
      }

      window.location.href = checkoutUrl;
      return;
    }

    if (paymentConfig.paymongoGivingLink) {
      window.location.href = buildUrlWithParams(paymentConfig.paymongoGivingLink, {
        amount: selectedAmount,
        currency: "PHP",
        fund,
        method,
      });
      return;
    }

    throw new Error("Add a PayMongo endpoint or giving link in the CMS settings.");
  };

  const openWise = () => {
    if (!paymentConfig.wiseGivingLink) {
      throw new Error("Add a Wise giving link in the CMS settings.");
    }

    window.location.href = buildUrlWithParams(paymentConfig.wiseGivingLink, {
      amount: selectedAmount,
      currency: "USD",
      fund,
    });
  };

  const handleCheckout = async () => {
    const amountNum = Number(selectedAmount);

    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      alert("Please select or enter an amount.");
      return;
    }

    setIsLoading(true);

    try {
      if (route === "philippines") {
        await openPayMongo();
      } else {
        openWise();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Please try again.";
      alert(`Could not start giving: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <section className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-black font-sans">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/75 via-black/45 to-black/35" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.heroImage}
            className="h-full w-full object-cover opacity-65"
            alt="Giving"
          />
        </div>
        <div className="relative z-20 flex max-w-3xl flex-col items-center px-6 text-center text-white">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.32em] text-purple-100">
            {data.heroSubtitle}
          </p>
          <h1 className="text-5xl font-black uppercase italic tracking-tight md:text-7xl">
            {data.heroTitle}
          </h1>
        </div>
      </section>

      <div className="relative z-30 mx-auto -mt-14 mb-20 grid max-w-6xl gap-6 px-4 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-10">
          <div className="mb-6 flex flex-col gap-2">
            <h2 className="text-3xl font-black text-gray-950">{data.formTitle}</h2>
            <p className="text-sm font-semibold text-gray-500">{data.secureGivingText}</p>
          </div>

          <div className="mb-8 grid grid-cols-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => switchRoute("philippines")}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-md text-sm font-black transition ${
                route === "philippines" ? "bg-[#8A2BE2] text-white shadow" : "text-gray-700"
              }`}
            >
              <MapPin size={18} />
              Philippines
            </button>
            <button
              onClick={() => switchRoute("international")}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-md text-sm font-black transition ${
                route === "international" ? "bg-[#8A2BE2] text-white shadow" : "text-gray-700"
              }`}
            >
              <Globe2 size={18} />
              International
            </button>
          </div>

          <div className="mb-8 rounded-lg border border-purple-100 bg-purple-50 p-5">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#8A2BE2]">
                {route === "philippines" ? <Wallet size={23} /> : <Banknote size={23} />}
              </div>
              <div>
                <h3 className="font-black text-gray-950">
                  {route === "philippines" ? data.localGivingTitle : data.internationalGivingTitle}
                </h3>
                <p className="text-sm font-semibold text-gray-600">
                  {route === "philippines" ? data.localGivingSubtitle : data.internationalGivingSubtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-7">
            <div>
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-gray-500">
                Choose Amount
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {quickAmounts.map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setAmount(String(val));
                      setCustomAmount("");
                    }}
                    className={`rounded-lg border-2 py-4 text-base font-black transition ${
                      amount === String(val) && !customAmount
                        ? "border-[#8A2BE2] bg-[#8A2BE2] text-white"
                        : "border-gray-100 bg-gray-50 text-gray-900 hover:border-purple-200"
                    }`}
                  >
                    {formatAmount(val, currency)}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-black text-gray-700">Custom Amount</span>
              <input
                type="number"
                placeholder={route === "philippines" ? "Enter PHP amount" : "Enter USD amount"}
                value={customAmount}
                onChange={(event) => {
                  setCustomAmount(event.target.value);
                  setAmount("");
                }}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-4 font-bold text-gray-950 outline-none transition focus:border-[#8A2BE2]"
              />
            </label>

            <div>
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-gray-500">
                Giving Fund
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.funds.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFund(item)}
                    className={`min-h-11 rounded-lg border px-3 text-sm font-black transition ${
                      fund === item
                        ? "border-[#8A2BE2] bg-purple-50 text-[#8A2BE2]"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {route === "philippines" && (
              <div>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-gray-500">
                  Local Payment Method
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {localPaymentOptions.map((option) => {
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setMethod(option.id)}
                        className={`rounded-lg border p-4 text-left transition ${
                          method === option.id
                            ? "border-[#8A2BE2] bg-purple-50"
                            : "border-gray-200 bg-white hover:border-purple-200"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#8A2BE2]">
                            <Icon size={21} />
                          </div>
                          {method === option.id && <CheckCircle2 className="text-[#8A2BE2]" size={20} />}
                        </div>
                        <p className="font-black text-gray-950">{option.label}</p>
                        <p className="mt-1 text-sm font-semibold leading-5 text-gray-500">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {route === "international" && (
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="font-black text-gray-950">Wise transfer details</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-gray-500">
                  {data.wiseInstructions}
                </p>
                <div className="mt-4 grid gap-3 border-t border-gray-100 pt-4 text-sm font-bold text-gray-600">
                  <div className="flex justify-between gap-4">
                    <span>Currency</span>
                    <span className="text-right text-gray-950">USD or donor local currency</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Fund</span>
                    <span className="text-right text-gray-950">{fund}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-black text-gray-700">Name</span>
                <input
                  value={donorName}
                  onChange={(event) => setDonorName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-4 font-bold text-gray-950 outline-none transition focus:border-[#8A2BE2]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black text-gray-700">Email</span>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(event) => setDonorEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-4 font-bold text-gray-950 outline-none transition focus:border-[#8A2BE2]"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-black text-gray-700">Note</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Optional note"
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-4 py-4 font-bold text-gray-950 outline-none transition focus:border-[#8A2BE2]"
              />
            </label>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#8A2BE2] py-5 text-center font-black uppercase tracking-[0.12em] text-white shadow-xl transition hover:bg-[#7A22D0] active:scale-[0.99] disabled:bg-gray-400"
            >
              {isLoading ? <Loader2 className="animate-spin" size={22} /> : <Heart size={20} fill="white" />}
              <span>{isLoading ? "Opening giving..." : `Give ${formattedAmount}`}</span>
            </button>
          </div>
        </section>

        <aside className="rounded-2xl bg-[#8A2BE2] p-7 text-white shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-100">Why Give?</p>
          <h2 className="mt-4 text-4xl font-black uppercase italic tracking-tight">
            Generosity makes ministry move.
          </h2>
          <div className="mt-9 space-y-6">
            {data.givingReasons.map((reason) => (
              <div key={reason.title} className="flex gap-4">
                <CheckCircle2 size={24} className="shrink-0 text-white" strokeWidth={3} />
                <div>
                  <h4 className="text-sm font-black uppercase italic">{reason.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-purple-100">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-lg bg-white/10 p-5">
            <p className="text-sm font-semibold leading-6 text-purple-50">{data.scriptureQuote}</p>
            <p className="mt-3 text-sm font-black text-white">{data.scriptureReference}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
