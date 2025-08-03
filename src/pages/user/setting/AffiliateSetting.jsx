import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getMyAffiliateInfo,
  registerAsAffiliate,
} from "../../../api/affiliateApi";
import { getMyProfile } from "../../../api/userApi";

const Banks = [
  "Bangkok Bank",
  "Kasikornbank",
  "Krungthai Bank",
  "TMBThanachart Bank (ttb)",
  "Siam Commercial Bank (SCB)",
  "Bank of Ayudhya (Krungsri)",
  "Government Savings Bank",
  "Bank for Agriculture and Agricultural Co-operatives (BAAC)",
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
  const [user, setUser] = useState(null); // State สำหรับเก็บข้อมูล user ทั่วไป (เช่น ชื่อ)
  const [affiliateInfo, setAffiliateInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // State for the registration form
  const [regFormData, setRegFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    methodType: "BANK_TRANSFER",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  // State for the link generator
  const [generatedLink, setGeneratedLink] = useState("");

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      // ดึงข้อมูลทั้ง 2 ส่วนพร้อมกัน
      const [profileRes, affiliateRes] = await Promise.all([
        getMyProfile(),
        getMyAffiliateInfo().catch((err) => {
          // ถ้า affiliate API คืนค่า 404 ให้ถือว่าเป็นเรื่องปกติ (ยังไม่เคยสมัคร)
          if (err.response && err.response.status === 404) {
            return null; // คืนค่า null แทนที่จะเป็น error
          }
          throw err; // ถ้าเป็น error อื่น ให้โยนต่อไป
        }),
      ]);

      setUser(profileRes.data.result);
      if (affiliateRes) {
        setAffiliateInfo(affiliateRes.data.affiliate);
      }
    } catch (err) {
      setError("Could not load page data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const computeStats = (affiliate) => {
    if (!affiliate)
      return {
        totalSales: 0,
        pendingCommissions: 0,
        paidOut: 0,
      };

    const totalSales = (affiliate.order || []).length;

    const pendingCommissions = (affiliate.commissions || [])
      .filter((c) => c.status === "PENDING")
      .reduce((sum, c) => sum + parseFloat(c.commissionAmount), 0);

    const paidOut = (affiliate.commissions || [])
      .filter((c) => c.status === "PAID")
      .reduce((sum, c) => sum + parseFloat(c.commissionAmount), 0);

    return {
      totalSales,
      pendingCommissions,
      paidOut,
    };
  };

  const { totalSales, pendingCommissions, paidOut } =
    computeStats(affiliateInfo);

  const handleRegInputChange = (e) => {
    const { name, value } = e.target;
    setRegFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setError("");
    try {
      const accountDetails = {
        bankName: regFormData.bankName,
        accountNumber: regFormData.accountNumber,
        accountName: regFormData.accountName,
      };
      await registerAsAffiliate({
        accountDetails,
        methodType: regFormData.methodType,
      });
      await fetchInitialData(); // ดึงข้อมูลใหม่ทั้งหมดหลังสมัครสำเร็จ
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleGenerateLink = () => {
    if (affiliateInfo && affiliateInfo.affiliateCode) {
      const link = `${window.location.origin}/register?ref=${affiliateInfo.affiliateCode}`;
      setGeneratedLink(link);
    }
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    alert("Copied to clipboard!");
  };

  if (isLoading) {
    return <div>Loading Affiliate Info...</div>;
  }

  // ===== RENDER REGISTRATION FORM IF NOT AN AFFILIATE =====
  if (!affiliateInfo) {
    return (
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <div className="space-y-2">
          <h1 className="text-headlineMedium font-header text-text-primary">
            Join our Affiliate Program
          </h1>
          <p className="text-body-2 text-text-secondary">
            Start earning by sharing your favorite books. First, please provide
            your payment details.
          </p>
        </div>
        <div className="bg-paper-elevation-6 shadow-card-3d rounded-2xl p-6">
          <h2 className="text-subtitle-1 font-header text-text-primary">
            Register as an Affiliate
          </h2>
          <form onSubmit={handleRegistrationSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="accountName"
                className="block text-sm font-medium"
              >
                Account Name
              </label>
              <input
                type="text"
                name="accountName"
                id="accountName"
                value={regFormData.accountName}
                onChange={handleRegInputChange}
                required
                className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium">
                Bank Name
              </label>
              <select
                name="bankName"
                id="bankName"
                value={regFormData.bankName}
                onChange={handleRegInputChange}
                required
                className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
              >
                <option value="">Please select...</option>
                {Banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium"
              >
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                value={regFormData.accountNumber}
                onChange={handleRegInputChange}
                required
                className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={isRegistering}>
              {isRegistering ? "Registering..." : "Register and Get Link"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // ===== RENDER DASHBOARD IF USER IS AN AFFILIATE =====
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
          Generate Your Main Affiliate Link
        </h2>
        <p className="text-body-2 text-text-secondary">
          Click the button to get your main affiliate link to share.
        </p>
        <Button onClick={handleGenerateLink}>Generate Affiliate Link</Button>
        <div className="space-y-1 pt-2">
          <p className="text-body-2 text-text-secondary">
            Your Affiliate Link:
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              readOnly
              value={generatedLink}
              placeholder="Click the button above to generate your link."
              className="bg-muted text-body-2 text-text-secondary flex-1 rounded-full border border-neutral-300 px-4 py-2"
            />
            <Button
              variant="mixed"
              color="error"
              className="w-fit"
              onClick={handleCopyLink}
            >
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="bg-secondary-soft space-y-1 rounded-xl p-4 text-center">
          <p className="text-body-2 text-text-secondary">Total Sales</p>
          <p className="text-headlineMedium font-header text-text-primary">
            {totalSales}
          </p>
        </div>
        <div className="bg-secondary-soft space-y-1 rounded-xl p-4 text-center">
          <p className="text-body-2 text-text-secondary">Pending Commissions</p>
          <p className="text-headlineMedium font-header text-text-primary">
            ${pendingCommissions.toFixed(2)}
          </p>
        </div>
        <div className="bg-secondary-soft space-y-1 rounded-xl p-4 text-center">
          <p className="text-body-2 text-text-secondary">Paid Out</p>
          <p className="text-headlineMedium font-header text-text-primary">
            ${paidOut.toFixed(2)}
          </p>
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
