import React from "react";

const passwordFields = [
  { label: "Current Password", placeholder: "Enter your current password" },
  { label: "New Password", placeholder: "Create a new password" },
  { label: "Confirm New Password", placeholder: "Re-enter your new password" },
];
function PasswordSetting() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-headlineMedium font-header text-text-primary">
        Change Password
      </h1>

      <div className="bg-paper-elevation-1 shadow-card-3d space-y-6 rounded-2xl p-6">
        {passwordFields.map(({ label, placeholder }, idx) => (
          <div key={idx}>
            <label className="text-body-2 text-text-primary block">
              {label}
            </label>
            <input
              type="password"
              placeholder={placeholder}
              className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default PasswordSetting;
