"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import SplineBlock from "@/components/common/Spline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <Box bg="#F5F9FC">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <Box
            as="section"
            display="flex"
            justifyContent="space-between"
            margin="0 auto"
            maxW="800px"
            p="60px 16px 30px 16px"
          >
            <Box
              mt="80px"
              position="relative"
              zIndex={1}
              width={{ base: "100%", md: "auto" }}
              minHeight={{ base: "200px", md: "inherit" }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Heading as="h2" fontSize="24px" mb="20px">
                ポートフォリオを公開しよう
              </Heading>
              <Text fontWeight="bold">
                完成していなくても大丈夫。
                <br />
                あなたの作品を見てくれる人がいます。
              </Text>
            </Box>
            <Box
              position={{ base: "absolute", md: "relative" }}
              left={{ base: `calc((100vw - 350px) / 2)`, md: "auto" }}
              opacity={{ base: "0.2", md: "1" }}
              zIndex={0}
            >
              <SplineBlock
                width={350}
                height={280}
                scene="https://prod.spline.design/guRoUXZwi-BF5S1n/scene.splinecode"
              />
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            as="section"
            display="flex"
            justifyContent="space-between"
            margin="0 auto"
            maxW="800px"
            p="60px 16px 30px 16px"
          >
            <Box
              mt="80px"
              position="relative"
              zIndex={1}
              width={{ base: "100%", md: "auto" }}
              minHeight={{ base: "200px", md: "inherit" }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Heading as="h2" fontSize="24px" mb="20px">
                作品を評価しましょう
              </Heading>
              <Text fontWeight="bold">
                いい作品があったら
                <br />
                良い評価をしてあげてください。
              </Text>
            </Box>
            <Box
              position={{ base: "absolute", md: "relative" }}
              left={{ base: "calc(100vw - 350px)/2", md: "auto" }}
              opacity={{ base: "0.2", md: "1" }}
              zIndex={0}
            >
              <SplineBlock
                width={350}
                height={280}
                scene="https://prod.spline.design/W4wTtyCC337yYGzT/scene.splinecode"
              />
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Hero;
