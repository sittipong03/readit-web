import React from "react";
import { NavLink } from "react-router";

const menuItems = [
  { path: "/setting/general", label: "General" },
  { path: "/setting/password", label: "Change Password" },
  { path: "/setting/purchases", label: "Purchases" },
  { path: "/setting/affiliate", label: "Affiliate" },
  // { path: "/setting/earning", label: "Earning" },
];

const linkStyles = {
  base: "block px-4 py-3 rounded-lg subtitle-3",
  active: "bg-primary-soft text-primary-dark font-semibold ",
  inactive: "text-text-secondary hover:bg-text-hover",
};

function SettingsSidebar() {
  return (
    <aside className="ml-12 w-64 flex-shrink-0">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.inactive}`
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
export default SettingsSidebar;
