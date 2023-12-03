import { Tabs, Tab, TabList, TabIndicator } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

type ProfileTabProps = {
  profileId: string;
	tabNum: 0 | 1;
};

const ProfileTab: FC<ProfileTabProps> = (props, params) => {
  const profile_id: string = props.profileId;
	const tab_num: number = props.tabNum;

  return (
    <div className="px-[16px] mx-auto max-w-[800px]">
      <Tabs variant="unstyled" defaultIndex={tab_num}>
        <TabList>
          <Link href={`/profile/${profile_id}/`}>
            <Tab className="w-[96px] mr-[16px] font-medium">Profile</Tab>
          </Link>
          <Link href={`/profile/${profile_id}/works`}>
            <Tab className="w-[96px] font-medium">Works</Tab>
          </Link>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
					transition={"0"}
        />
      </Tabs>
    </div>
  );
};

export default ProfileTab;
