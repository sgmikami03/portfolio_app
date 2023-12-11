"use client"

import { Careers } from "@/type";
import { FC } from "react";
import ProfileCareer from "./ProfileCareer";

type ProfileCareersProps = {
  careers: Careers[];
  isEdit: boolean;
};

const ProfileCareers: FC<ProfileCareersProps> = (props) => {
  const careers = props.careers
  const isEdit = props.isEdit

  return (
    <div className="">
      {careers.map((career, index) => (
        <ProfileCareer career={career} key={index} isEdit={isEdit} />
      ))}
    </div>
  );
};

export default ProfileCareers;