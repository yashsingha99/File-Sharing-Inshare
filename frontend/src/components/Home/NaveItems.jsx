import React from "react";
import { Link } from "react-router-dom";

function NaveItems() {
  const navItems = [
    {
      path: "/",
      name: "Home",
      active: true,
    },
    {
      path: "/learnMore",
      name: "Learn more",
      active: true,
    },
    {
      path: "/about",
      name: "About us",
      active: true,
    },
    {
      path: "/contactUs",
      name: "Contact us",
      active: true,
    },
  ];
  return navItems.map((nav, i) => {
    return (
      <SiderButton
        key={i}
        link={nav.path}
        name={nav.name}
      />
    );
  });
}
const SiderButton = ({link, name }) => {
  return (
    <Link
     to={link}
      className="flex w-full border-b items-center font-medium text-gray-300 bg-cyan-700 h-10 hover:bg-cyan-900 hover:text-white hover:  py-4 px-4 w-6/7"
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.95 }}
    >
      {name}
    </Link>
  );
};
export default NaveItems;
