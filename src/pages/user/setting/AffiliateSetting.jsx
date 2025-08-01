import React from "react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Clicks:", value: "2.1K" },
  { label: "Total Sales:", value: "122" },
  { label: "Pending Commissions:", value: "$301.1" },
  { label: "Paid Out:", value: "$1.0K" },
];

const steps = [
  {
    step: "Step 1",
    text: "Get Your Unique Link. Generate a special affiliate link for any book on Readit directly from its product page or your Affiliate Dashboard.",
  },
  {
    step: "Step 2",
    text: "Share Your Recommendation. Post your link on your blog, social media, website, or anywhere you connect with fellow book lovers.",
  },
  {
    step: "Step 3",
    text: "Earn Commissions! When someone clicks your link and purchases that book (or any other book!) on Readit, you earn a commission on the sale.",
  },
];

export default function AffiliateSetting() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-headlineMedium font-header text-text-primary">
          Affiliate Program
        </h1>
        <p className="text-body-2 text-text-secondary">
          Turn your passion for books into an income stream! Join the Readit
          Affiliate Program and earn commissions when readers discover and
          purchase books through your unique links.
        </p>
      </div>

      {/* Generate Links Card */}
      <div className="bg-paper-elevation-6 shadow-card-3d space-y-4 rounded-2xl p-6">
        <h2 className="text-subtitle-1 font-header text-text-primary">
          Generate Your Affiliate Links
        </h2>
        <p className="text-body-2 text-text-secondary">
          Quickly create links for any book you want to share.
        </p>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search for a book to get your link..."
            className="text-body-2 focus:border-primary-main flex-1 rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
          />
          <Button>Generate Affiliate Link</Button>
        </div>

        <div className="space-y-1">
          <p className="text-body-2 text-text-secondary">
            Your Affiliate Link:
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Please select Book Title or ISBN first."
              disabled
              className="bg-color-action-disabledBackground text-body-2 text-text-secondary flex-1 rounded-full border border-neutral-300 px-4 py-2"
            />
            <Button variant="mixed" color="error" className="w-fit">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M8 2a2 2 0 00-2 2v1H4a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-1h1a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H8zm0 2h4v1H8V4zm7 4v7H5V8h10z" />
              </svg>
              <span>Copy link</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Card */}
      <div className="bg-paper-elevation-6 shadow-card-3d space-y-4 rounded-2xl p-6">
        <h2 className="text-subtitle-1 font-header text-text-primary">
          Your Affiliate Dashboard
        </h2>
        <p className="text-body-2 text-text-secondary">
          Welcome, [User&apos;s Name]! Your journey to earning has already
          begun.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-secondary-soft space-y-1 rounded-xl p-4 text-center"
            >
              <p className="text-body-2 text-text-secondary">{label}</p>
              <p className="text-headlineMedium font-header text-text-primary">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Card */}
      <div className="bg-paper-elevation-6 shadow-card-3d space-y-6 rounded-2xl p-6">
        <h2 className="text-subtitle-1 font-header text-text-primary">
          How It Works: Simple Steps to Earning
        </h2>
        <div className="flex flex-col gap-6 md:flex-row">
          {steps.map(({ step, text }) => (
            <div key={step} className="flex-1 space-y-2">
              <span className="border-primary-main text-body-3 text-primary-main inline-block rounded border px-2 py-1">
                {step}
              </span>
              <p className="text-body-2 text-text-primary">{text}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-body-2 font-header text-text-primary">
            Your Earning Potential
          </h3>
          <ul className="text-body-2 text-text-primary list-inside list-disc">
            <li>
              We believe in rewarding our community. You&apos;ll earn 10%
              commission on every successful purchase made through your
              affiliate links.
            </li>
            <li>
              Commissions are paid out monthly via bank transfer. Make sure your
              payment details are up-to-date in your Profile Settings.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
