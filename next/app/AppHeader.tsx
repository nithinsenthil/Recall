import React from "react";

interface Props {
  name: string;
}

const AppHeader = ({ name }: Props) => {
  return (
    <div className="flex flex-row bg-white justify-between px-32 pt-14 pb-5 border-b-4 border-primary">
      <img src="../public/Logo.svg" alt="../public/Recall Logo" />
      <div className="flex flex-row gap-5 items-center">
        <img src="PersonOutline.svg" alt="Person Outline" />
        <p className="text-lg text-black">User {name}</p>
      </div>
    </div>
  );
};

export default AppHeader;
