"use client";

import { Profile } from "@/type";
import { FC, useState } from "react";
import Image from "next/image";
import userImage from "@/public/images/icon/user.png";

type ProfileHeaderProps = {
  profile: Profile | null;
};

const ProfileHeader: FC<ProfileHeaderProps> = ({ profile }) => {
  const [showProfile, setShowProfile] = useState(profile);

  return (
    <div className="bg-app-bg h-[360px]">
      <div className="mx-auto pt-[220px] px-[16px] pb-[55px] max-w-[800px] relative">
        <Image src={userImage} alt="" width={96} className="absolute top-[220px] left-[16px] w-[96px] h-[96px] object-cover" />
        <h2 className="pl-[112px] text-4xl font-bold leading-[54px]">{showProfile?.name}</h2>
        <p className="pl-[112px] text-xl font-medium leading-[30px]">{showProfile?.occupation}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
