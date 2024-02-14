"use client";

import { Careers } from "@/type";
import { FC, useState } from "react";
import ProfileCareer from "./ProfileCareer";
import ProfileCareerCreate from "./ProfileCareerCreate";
import { Box } from "@chakra-ui/react";

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
    <Box mb="30px">
      {careers.map((career, index) => (
        <ProfileCareer career={career} key={index} isEdit={isEdit} profileId={profileId} setCareers={setCareers} />
      ))}
      {isEdit ? <ProfileCareerCreate setCareers={setCareers} profileId={profileId} /> : <></>}
    </Box>
  );
};

export default ProfileCareers;
