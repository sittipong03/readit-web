// src/pages/user/setting/PasswordSetting.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { useAuthStore } from "../../../store/authStore"; // Import store เพื่อเอา user id
import { updateUserPassword } from "../../../api/userApi"; // Import API function

const passwordFields = [
  {
    name: "currentPassword",
    label: "Current Password",
    placeholder: "Enter your current password",
  },
  {
    name: "newPassword",
    label: "New Password",
    placeholder: "Create a new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm New Password",
    placeholder: "Re-enter your new password",
  },
];

export default function PasswordSetting() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const { user } = useAuthStore((state) => state);

  const user = { id: "cmdsdolvd0000cr46zo8daocm" };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // --- Validation ---
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return setError("Please fill in all fields.");
    }
    if (passwords.newPassword.length < 8) {
      return setError("New password must be at least 8 characters long.");
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setError("New passwords do not match.");
    }
    if (!user || !user.id) {
      return setError("Could not identify user. Please login again.");
    }

    try {
      const dataToSend = {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      };

      await updateUserPassword(user.id, dataToSend);

      setSuccess("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }); // ล้างฟอร์ม
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to change password.";
      setError(errorMessage);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="text-headlineMedium font-header text-text-primary">
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-paper-elevation-6 shadow-card-3d space-y-6 rounded-2xl p-6"
      >
        {passwordFields.map(({ name, label, placeholder }) => (
          <div key={name} className="space-y-1">
            <label
              htmlFor={name}
              className="text-body-2 text-text-primary block"
            >
              {label}:
            </label>
            <input
              id={name}
              name={name}
              type="password"
              placeholder={placeholder}
              value={passwords[name]}
              onChange={handleInputChange}
              className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
            />
          </div>
        ))}

        {/* --- Display Error/Success Messages --- */}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <ul className="text-body-3 text-text-secondary list-inside list-disc">
          <li>At least 8 characters long.</li>
        </ul>

        <div className="flex justify-end">
          <Button type="submit">Change Password</Button>
        </div>
      </form>
    </div>
  );
}
