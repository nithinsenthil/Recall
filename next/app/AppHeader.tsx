import React from "react";

const AppHeader = () => {
  return (
    <div className="flex flex-row bg-white justify-between px-32 pt-14 pb-5 border-b-4 border-primary">
      <img src="Logo.svg" alt="Recall Logo" />
      <div className="flex flex-row gap-5 items-center">
        <img src="PersonOutline.svg" alt="Person Outline" />
        <p className="text-lg text-black">Siddharth Mani</p>
      </div>
    </div>
  );
};

export default AppHeader;
