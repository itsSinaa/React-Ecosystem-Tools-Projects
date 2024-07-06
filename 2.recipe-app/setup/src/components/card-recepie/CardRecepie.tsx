import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { type Recipe } from "./../../types/type";

const CardRecepie = ({
  description,
  id,
  image,
  time,
  title,
  vegan,
}: Recipe) => {

  return (
    <Card className="flex flex-col justify-between text-left">
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage className="object-cover" src={`./src/assets/img/${image}`} />
          <AvatarFallback>
            {title.slice(0,2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{time} mins to cook</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button>view Recipe</Button>
        {vegan && <Badge className="py-[6px]" variant={"secondary"}>Vegan!</Badge>}
      </CardFooter>
    </Card>
  );
};

export default CardRecepie;
