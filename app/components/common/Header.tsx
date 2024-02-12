import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getProfileById } from "@/lib/supabase/profiles";

const Header = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const profileId = session?.user.id;
  const profile = await getProfileById(profileId);

  const iconImageUrl = profile?.icon_image || "/images/icon/user.png";

  return (
    <Box as="header" bg="#fff">
      <Box
        margin="0 auto"
        maxW="800px"
        h="64px"
        px="16px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Link href="/">
            <Image src="/images/icon/icon.svg" alt="" width={173} height={20} />
          </Link>
        </Box>

        <Box h="40px">
          {profile ? (
            <Menu placement="bottom-end">
              <MenuButton>
                <Box
                  borderRadius="9999px"
                  border="2px solid"
                  borderColor="blue.50"
                  w="40px"
                  h="40px"
                  position="relative"
                >
                  <Image
                    src={iconImageUrl}
                    height={40}
                    width={40}
                    alt=""
                    objectFit="cover"
                    style={{
                      borderRadius: "9999px",
                      position: "absolute",
                      width: "100% !important",
                      height: "100% !important",
                    }}
                  />
                </Box>
              </MenuButton>
              <MenuList minWidth="180px">
                <MenuItem>
                  <Link href={`/profile/${profile.id}`}>マイプロフィール</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/logout">ログアウト</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button color="blue" variant="link">
              <Link href="/login">登録・ログイン</Link>
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
