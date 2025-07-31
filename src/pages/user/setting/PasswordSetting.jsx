import React from "react";
import { Button } from "@/src/components/ui/button";

// PasswordSettingPage without mock UI components, using index.css utilities
const passwordFields = [
  {
    id: "current",
    label: "Current Password",
    placeholder: "Enter your current password",
  },
  { id: "new", label: "New Password", placeholder: "Create a new password" },
  {
    id: "confirm",
    label: "Confirm New Password",
    placeholder: "Re-enter your new password",
  },
];

export default function PasswordSetting() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* Page Title */}
      <h1 className="text-headlineMedium font-header text-text-primary">
        Change Password
      </h1>

      {/* Card Container */}
      <div className="bg-paper-elevation-6 shadow-card-3d space-y-6 rounded-2xl p-6">
        {/* Password Fields */}
        {passwordFields.map(({ id, label, placeholder }) => (
          <div key={id} className="space-y-1">
            <label htmlFor={id} className="text-body-2 text-text-primary block">
              {label}:
            </label>
            <input
              id={id}
              type="password"
              placeholder={placeholder}
              className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
            />
          </div>
        ))}

        {/* Requirements */}
        <ul className="text-body-3 text-text-secondary list-inside list-disc">
          <li>At least 8 characters long.</li>
        </ul>

        {/* Action Button */}
        <div className="flex justify-end">
          <Button>Change Password</Button>
        </div>
      </div>
    </div>
  );
}
