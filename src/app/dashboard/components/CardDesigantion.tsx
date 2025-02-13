import { Icon } from "@/components/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type * as React from "react";

export type CardDesignationsType={
    designationName:string
    name:string
    qtds:number
    icon:Icon

}

export function CardDesignations({designationName,name,qtds,"icon":Icon}:CardDesignationsType) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {designationName}
        </CardTitle>
        <Icon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"/>
      
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{name}</div>
        <p className="text-xs text-muted-foreground">
          {qtds} vezes desde último mês
        </p>
      </CardContent>
    </Card>
  );
}
