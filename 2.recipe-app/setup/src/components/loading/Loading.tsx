import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {"abcdefghi".split("").map((item) => {
        return <LoadingLayout key={item}/>;
      })}
    </div>
  );
};

const LoadingLayout = () => {
  return (
    <Card className="flex flex-col justify-between text-left">
      <CardHeader className="flex-row gap-4 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="h-10 flex-grow" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-4 flex-grow mt-4" />
        <Skeleton className="h-4 flex-grow mt-4" />
        <Skeleton className="h-4 w-1/2 mt-4" />
      </CardContent>

      <CardFooter className="flex items-center justify-between">
            <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  );
};

export default Loading;
