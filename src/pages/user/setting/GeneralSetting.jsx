import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getMyProfile, updateUserProfile } from "../../../api/userApi";
import { getAddressData } from "../../../data/thailandAddressData.js";

const tabs = ["User Details", "Bank Account"];
const { provinces, getDataByProvince, getDataByDistrict } = getAddressData();

export default function GeneralSettings() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    bankAccount: "",
    bankName: "",
  });
  const [districts, setDistricts] = useState([]);
  const [postalCodes, setPostalCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getMyProfile();
        const profile = response.data.result;
        const userAddress = profile.userAddress?.[0] || {};
        setUser(profile);

        const newFormData = {
          name: profile.name || "",
          firstName: userAddress.receiverName?.split(" ")[0] || "",
          lastName:
            userAddress.receiverName?.split(" ").slice(1).join(" ") || "",
          mobile: profile.mobile || "",
          addressLine1: userAddress.addressLine1 || "",
          province: userAddress.province || "",
          city: userAddress.city || "",
          postalCode: userAddress.postalCode || "",
          bankAccount: profile.bankAccount || "",
          bankName: profile.bankName || "",
        };
        setFormData(newFormData);

        if (userAddress.province) {
          setDistricts(getDataByProvince(userAddress.province));
        }
        if (userAddress.province && userAddress.city) {
          setPostalCodes(
            getDataByDistrict(userAddress.province, userAddress.city),
          );
        }
      } catch (error) {
        setError("ไม่สามารถโหลดข้อมูลได้");
        console.log(error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const dataToUpdate =
        activeTab == "User Details"
          ? {
              name: formData.name,
              firstName: formData.firstName,
              lastName: formData.lastName,
              mobile: formData.mobile,
              address: formData.addressLine1, // ส่ง addressLine1
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
      setUser(response.data.user);
    } catch (error) {
      alert("อัพเดทข้อมูลไม่สำเร็จ");
      console.error(error);
    }
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-paper-elevation-6 shadow-card-3d mx-auto max-w-4xl space-y-6 rounded-2xl p-6">
      <div className="h5">General</div>

      {/* Top Section */}
      <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="text-displayLarge bg-black-main text-white-main font-display-1 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-900 text-white">
            {user?.name?.substring(0, 2).toUpperCase() || "CC"}
          </div>

          {/* Change Photo */}
          <div>
            <Button color="secondary" className="w-fit">
              Change Profile Photo
            </Button>
            <p className="text-body-1 text-text-secondary mt-2">
              Upload a file from your device.
            </p>
            <p className="text-body-1 text-text-secondary mt-2">
              {" "}
              Image should be square, at least 184px × 184px.
            </p>
          </div>
        </div>

        {/* Email Field */}
        <div className="flex-1">
          <label className="text-subtitle-2 text-text-secondary">Email:</label>
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
          >
            {tab}
          </button>
        ))}
      </nav>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {activeTab === "User Details" && (
          <>
            {/* Display Name */}
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
              />
            </div>

            {/* Address Section */}
            <div>
              <div className="flex items-center space-x-2">
                {/* Home Icon */}
                <svg
                  className="text-text-primary h-7 w-7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3l7 6v12h-5v-7H10v7H5V9l7-6z" />
                </svg>
                <h2 className="text-subtitle-1 font-header">Address Details</h2>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* First Name */}
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
                  />
                </div>

                {/* Last Name */}
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
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="text-body-2 text-text-primary block">
                    Country:
                  </label>
                  <select className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none">
                    <option>Thailand</option>
                  </select>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="text-body-2 text-text-primary block">
                    Mobile number: <span className="text-error-main">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                  />
                </div>

                {/* Street Address */}
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
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-body-2 text-text-primary block">
                    City:
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleProvinceChange}
                    className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
                  >
                    <option value="">Please select...</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State / Province / Region */}

                <div>
                  <label className="text-body-2 text-text-primary block">
                    District:
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleDistrictChange}
                    disabled={!formData.province}
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

                {/* Postal / Zip Code */}
                <div>
                  <label className="text-body-2 text-text-primary block">
                    Postal / Zip Code:
                  </label>
                  <select
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    disabled={!formData.city}
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
                  placeholder="Bank Account Number..."
                  className="text-body-2 focus:border-primary-main mt-2 w-full rounded-full border border-neutral-300 px-4 py-2 focus:outline-none"
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
                >
                  <option value="">Please select...</option>
                  <option value="KASIKORNBANK">Kasokorn Bank</option>
                  <option value="SCB">Siam Commercial Bank</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="outlined" color="error">
            Delete My Account
          </Button>

          <div className="space-x-4">
            <Button variant="outlined" color="neutral">
              Discard Changes
            </Button>

            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
