import React from "react";
import { Skeleton, Stack, Center } from "native-base";

function HomeSkeleton() {
  return (
    <Center>
      <Stack width="90%">
        <Skeleton variant="text" height={6} />
        <Skeleton my={2} height={6} variant="rect" />

        <Skeleton variant="text" height={6} />
        <Skeleton my={2} height={6} variant="rect" />

        <Skeleton mt={4} variant="text" height={6} />
        <Skeleton my={2} height={6} variant="rect" />

        <Skeleton mt={4} variant="text" height={6} />
        <Skeleton my={2} height={6} variant="rect" />
        {/* <Skeleton my={2} height={6} variant="circle" size={20} /> */}
      </Stack>
    </Center>
  );
}

export default HomeSkeleton;
