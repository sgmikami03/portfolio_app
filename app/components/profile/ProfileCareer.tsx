import { Careers } from "@/type";
import { FC } from "react";
import Image from "next/image";
import careerImage from "@/public/images/icon/carrier.png";

type ProfileCareerProps = {
  career: Careers;
};

const ProfileCareer: FC<ProfileCareerProps> = (props) => {
  const career = props.career;

  return (
    <div className="
    mx-auto mb-[40px] px-[16px] max-w-[800px] flex gap-[16px] relative
    before:inline-block before:absolute before:w-[3px] before:h-[calc(100%+40px)] before:top-0 before:left-[63px] before:bg-app-bg-g before:z-0 
    last:before:opacity-0
    ">
      <div className="w-[96px] relative z-1">
        <Image className="mx-auto" src={careerImage} width={70} alt="" />
      </div>
      <div>
        <h3 className="mb-[5px] text-xl font-bold leading-[30px]">
          {career.name}
          <span className="inline-block ml-2 text-base text-app-main">
            {career.start ? career.start?.slice(0, 4) : ""}-
            {career.end ? career.end?.slice(0, 4) : ""}
          </span>
        </h3>
        <h4 className="font-medium">{career.occupation}</h4>
        {career.text ? (
          <p className="font-medium mt-[20px]">{career.text}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileCareer;
