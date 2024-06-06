import {  Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";

export default function CardTeams({item} :any){
  return(
    <Card className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <h4 className="font-bold text-large">{item.name}</h4>
      <p className="text-tiny uppercase font-bold">{item.jabatan}</p>
      <small className="text-default-500">12 Tracks</small>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <Image
        alt="Card background"
        className="object-cover rounded-xl"
        src="https://nextui.org/images/hero-card-complete.jpeg"
        width={270}
        height={270}
      />
    </CardBody>
  </Card>
  )
}