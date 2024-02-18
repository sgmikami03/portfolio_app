import { Tabs, Tab, TabList, TabIndicator, Box } from "@chakra-ui/react";
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
    <Box px="16px" mx="auto" maxW="800px" mb="30px">
      <Tabs variant="unstyled" defaultIndex={tab_num}>
        <TabList>
          <Link href={`/profile/${profile_id}/`}>
            <Tab w="96px" fontWeight="medium" mr="16px">
              Profile
            </Tab>
          </Link>
          <Link href={`/profile/${profile_id}/works`}>
            <Tab w="96px" fontWeight="medium">
              Works
            </Tab>
          </Link>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
          transition="0"
        />
      </Tabs>
    </Box>
  );
};

export default ProfileTab;
