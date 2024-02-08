"use client";

import { Box, Spinner } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
import { useState } from "react";

type SplineBlockProps = {
  scene: string;
  width: number;
  height: number;
};

const SplineBlock = ({ scene, width, height }: SplineBlockProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <Box width={width || "auto"} height={height || "auto"}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Spinner color="gray.500" />
        </Box>
      ) : (
        <></>
      )}
      <Spline
        onLoad={() => setLoading(false)}
        scene={scene}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "auto",
          maxWidth: "100px",
          margin: "0 auto",
        }}
      />
    </Box>
  );
};

export default SplineBlock;
