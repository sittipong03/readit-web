import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getMyProfile,
  updateUserProfile,
  updateUserAvatarUrl,
} from "../../../api/userApi";
import { getAddressData } from "../../../data/thailandAddressData.js";
import { useNavigate } from "react-router-dom";

const tabs = ["User Details", "Bank Account"];
const { provinces, getDataByProvince, getDataByDistrict } = getAddressData();

export default function GeneralSettings() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    province: "",
    city: "",
    postalCode: "",
    bankAccount: "",
    bankName: "",
  });
  const [districts, setDistricts] = useState([]);
  const [postalCodes, setPostalCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getMyProfile();
        const profile = response.data.result;
        setUser(profile);

        const userAddress = profile.userAddress || {};
        if (userAddress.province) {
          setDistricts(getDataByProvince(userAddress.province));
        }
        if (userAddress.province && userAddress.city) {
          setPostalCodes(
            getDataByDistrict(userAddress.province, userAddress.city),
          );
        }

        setFormData({
          name: profile.name || "",
          firstName: userAddress.receiverName
            ? userAddress.receiverName.split(" ")[0]
            : "",
          lastName: userAddress.receiverName
            ? userAddress.receiverName.split(" ").slice(1).join(" ")
            : "",
          phoneNumber: userAddress.phoneNumber || "",
          address: userAddress.address || "",
          province: userAddress.province || "",
          city: userAddress.city || "",
          postalCode: userAddress.postalCode || "",
          bankAccount: profile.bankAccount || "",
          bankName: profile.bankName || "",
        });
      } catch (err) {
        console.error("fetchProfile error:", err);
        setError("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setFormData((prev) => ({
      ...prev,
      province: selectedProvince,
      city: "",
      postalCode: "",
    }));
    setDistricts(getDataByProvince(selectedProvince));
    setPostalCodes([]);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city: selectedDistrict,
      postalCode: "",
    }));
    setPostalCodes(getDataByDistrict(formData.province, selectedDistrict));
  };

  const handleDiscardChanges = () => {
    if (!user) return;
    if (window.confirm("คุณต้องการยกเลิกการแก้ไขทั้งหมดใช่หรือไม่?")) {
      const userAddress = (user.userAddress && user.userAddress[0]) || {};
      setFormData({
        name: user.name || "",
        firstName: userAddress.receiverName
          ? userAddress.receiverName.split(" ")[0]
          : "",
        lastName: userAddress.receiverName
          ? userAddress.receiverName.split(" ").slice(1).join(" ")
          : "",
        phoneNumber: userAddress.phoneNumber || "",
        address: userAddress.address || "",
        province: userAddress.province || "",
        city: userAddress.city || "",
        postalCode: userAddress.postalCode || "",
        bankAccount: user.bankAccount || "",
        bankName: user.bankName || "",
      });

      if (userAddress.province) {
        setDistricts(getDataByProvince(userAddress.province));
      } else {
        setDistricts([]);
      }
      if (userAddress.province && userAddress.city) {
        setPostalCodes(
          getDataByDistrict(userAddress.province, userAddress.city),
        );
      } else {
        setPostalCodes([]);
      }

      alert("ยกเลิกการแก้ไขเรียบร้อยแล้ว");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const dataToUpdate =
        activeTab === "User Details"
          ? {
              name: formData.name,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phoneNumber: formData.phoneNumber || "",
              address: formData.address || "",
              province: formData.province,
              city: formData.city,
              postalCode: formData.postalCode,
            }
          : {
              bankAccount: formData.bankAccount,
              bankName: formData.bankName,
            };
      const response = await updateUserProfile(user.id, dataToUpdate);
      alert("อัพเดทข้อมูลสำเร็จ");
      const updatedProfile = response.data.user;
      const updatedAddress =
        (updatedProfile.userAddress && updatedProfile.userAddress[0]) || {};
      setUser(updatedProfile);
      setFormData({
        name: updatedProfile.name || "",
        firstName: updatedAddress.receiverName
          ? updatedAddress.receiverName.split(" ")[0]
          : "",
        lastName: updatedAddress.receiverName
          ? updatedAddress.receiverName.split(" ").slice(1).join(" ")
          : "",
        phoneNumber: updatedAddress.phoneNumber || "",
        address: updatedAddress.address || "",
        province: updatedAddress.province || "",
        city: updatedAddress.city || "",
        postalCode: updatedAddress.postalCode || "",
        bankAccount: updatedProfile.bankAccount || "",
        bankName: updatedProfile.bankName || "",
      });
    } catch (err) {
      console.error("submit error:", err);
      alert("อัปเดทข้อมูลไม่สำเร็จ");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "คุณแน่ใจหรือไม่ว่าต้องการลบบัญชี? การกระทำนี้ไม่สามารถย้อนกลับได้",
      )
    ) {
      try {
        alert("ลบบัญชีสำเร็จแล้ว");
        localStorage.removeItem("authToken");
        navigate("/");
        window.location.reload();
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการลบบัญชี");
        console.error(err);
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formPayload = new FormData();
    formPayload.append("file", file);
    formPayload.append("upload_preset", "readit_avatars");
    try {
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dzxdwmjeb/image/upload",
        {
          method: "POST",
          body: formPayload,
        },
      ).then((res) => res.json());
      const secureUrl = cloudinaryRes.secure_url;
      if (!secureUrl) throw new Error("Image upload failed");
      const backendRes = await updateUserAvatarUrl(secureUrl);
      setUser(backendRes.data.user);
      alert("อัปเดต รูปโปรไฟล์สำเร็จ!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-headlineMedium font-header text-text-primary flex items-center gap-2">
          General
          {loading && (
            <span className="text-text-secondary text-sm font-normal">
              (Loading...)
            </span>
          )}
        </h1>
      </div>

      {error && (
        <div className="rounded bg-red-100 px-4 py-2 text-red-700">{error}</div>
      )}

      <div className="bg-paper-elevation-6 shadow-card-3d mx-auto space-y-6 rounded-2xl p-6">
        {/* Top Section */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-6">
            <img
              src={
                user?.avatarUrl ||
                `https://ui-avatars.com/api/?name=${user?.name}&background=random`
              }
              alt="Profile Avatar"
              className="h-24 w-24 rounded-full bg-neutral-200 object-cover"
            />

            <div>
              <Button
                color="secondary"
                className="w-fit"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || loading}
              >
                {isUploading ? "Uploading..." : "Change Profile Photo"}
              </Button>
              <input
                type="file"
                ref={(el) => (fileInputRef.current = el)}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
                style={{ display: "none" }}
              />

              <p className="text-body-1 text-text-secondary mt-2">
                Upload a file from your device.
              </p>
              <p className="text-body-1 text-text-secondary mt-2">
                Image should be square, at least 184px × 184px.
              </p>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-subtitle-2 text-text-secondary">
              Email:
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="text-body-2 text-text-primary focus:border-primary-main mt-1 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex space-x-8 border-b border-neutral-300">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-subtitle-2 font-button cursor-pointer pb-2 ${
                activeTab === tab
                  ? "border-primary-main text-primary-main border-b-2"
                  : "text-text-primary border-b-2 border-transparent"
              }`}
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {activeTab === "User Details" && (
            <>
              <div>
                <label className="text-body-2 text-text-primary block">
                  Display name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                  disabled={loading}
                />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="text-text-primary h-7 w-7"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 3l7 6v12h-5v-7H10v7H5V9l7-6z" />
                  </svg>
                  <h2 className="text-subtitle-1 font-header">
                    Address Details
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-body-2 text-text-primary block">
                      First name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="text-body-2 text-text-primary block">
                      Last name:
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="text-body-2 text-text-primary block">
                      Country:
                    </label>
                    <select
                      disabled
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                    >
                      <option>Thailand</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-body-2 text-text-primary block">
                      Mobile number: <span className="text-error-main">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="text-body-2 text-text-primary block">
                      Street Address:
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House number, street name, apartment etc..."
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="text-body-2 text-text-primary block">
                      Province:
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleProvinceChange}
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                      disabled={loading}
                    >
                      <option value="">Please select...</option>
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-body-2 text-text-primary block">
                      District:
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleDistrictChange}
                      disabled={!formData.province || loading}
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                    >
                      <option value="">Please select...</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-body-2 text-text-primary block">
                      Postal / Zip Code:
                    </label>
                    <select
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      disabled={!formData.city || loading}
                      className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                    >
                      <option value="">Please select...</option>
                      {postalCodes.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="outlined"
                  color="error"
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  Delete My Account
                </Button>
                <div className="space-x-4">
                  <Button
                    variant="outlined"
                    color="neutral"
                    type="button"
                    onClick={handleDiscardChanges}
                    disabled={loading}
                  >
                    Discard Changes
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeTab === "Bank Account" && (
            <div>
              <div className="flex items-center space-x-2">
                <svg
                  className="text-text-primary h-6 w-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 12l9-6 9 6v8H3v-8zm3 2v4h4v-4H6zm8 0v4h4v-4h-4z" />
                </svg>
                <h2 className="text-subtitle-1 font-header text-text-primary">
                  Bank Account
                </h2>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-body-2 text-text-primary block">
                    Bank Account Number:
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="text-body-2 text-text-primary block">
                    Bank:
                  </label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                    disabled={loading}
                  >
                    <option value="">Please select...</option>
                    <option value="KASIKORNBANK">Kasikorn Bank</option>
                    <option value="SCB">Siam Commercial Bank</option>
                    <option value="BANGKOKBANK">Bangkok Bank</option>
                    <option value="KRUNGTHAIBANK">Krungthai Bank</option>
                    <option value="TTB">TMBThanachart Bank (ttb)</option>
                    <option value="KRUNGSRI">Bank of Ayudhya (Krungsri)</option>
                    <option value="GOVERNMENTSAVINGSBANK">
                      Government Savings Bank
                    </option>
                    <option value="BACC">
                      Bank for Agriculture and Agricultural Co-operatives (BAAC)
                    </option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="outlined"
                  color="error"
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  Delete My Account
                </Button>
                <div className="space-x-4">
                  <Button
                    variant="outlined"
                    color="neutral"
                    type="button"
                    onClick={handleDiscardChanges}
                    disabled={loading}
                  >
                    Discard Changes
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
