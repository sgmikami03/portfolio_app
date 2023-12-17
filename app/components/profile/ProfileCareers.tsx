"use client";

import { Careers } from "@/type";
import { FC, useState } from "react";
import ProfileCareer from "./ProfileCareer";
import ProfileCareerCreate from "./ProfileCareerCreate";

type ProfileCareersProps = {
  profileId: string;
  careers: Careers[];
  isEdit: boolean;
};

const ProfileCareers: FC<ProfileCareersProps> = (props) => {
  const [careers, setCareers] = useState<Careers[]>(props.careers);
  const isEdit = props.isEdit;
  const profileId = props.profileId;

  return (
    <div className="">
      {careers.map((career, index) => (
        <ProfileCareer career={career} key={index} isEdit={isEdit} />
      ))}
      {isEdit ? <ProfileCareerCreate setCareers={setCareers} profileId={profileId} /> : <></>}
    </div>
  );
};

export default ProfileCareers;
