import { Careers } from "@/type";
import { FC } from "react";
import ProfileCareer from "./ProfileCareer";

type ProfileCareersProps = {
  careers: Careers[]
};

const ProfileCareers: FC<ProfileCareersProps> = (props) => {
  const careers = props.careers

  return (
    <div className="">
      {careers.map((career, index) => (
        <ProfileCareer career={career} key={index} />
      ))}
    </div>
  );
};

export default ProfileCareers;