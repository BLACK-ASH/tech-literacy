import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getParticipants } from "@/features/event/action/getParticipant";
import { ParticipationType } from "@/lib/Database/Models/participation.model";
import { eventsData } from "@/lib/eventData";
import { Separator } from "@radix-ui/react-separator";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React, { Suspense } from "react";

const page = async ({ params }: { params: { name: string } }) => {
  const { name } = await params;

  const event = eventsData.find((event) => event.id === name);
  if (!event) {
    return <h1>Event not found</h1>;
  }

  const participants: ParticipationType[] = await getParticipants(name);

  return (
    <div>
      <main className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-4">
        <div className="flex justify-between items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="size-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/event">Event</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="hidden sm:block">
                  {event.title}
                </BreadcrumbPage>
                <BreadcrumbPage className="sm:hidden">{`${event.title.slice(
                  0,
                  30
                )}...`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl text-primary font-bold text-center py-4 md:py-12">
          {event?.title}
        </h1>
        <Image
          src={event?.image || "/default-fallback-image.png"}
          alt={event?.title || "Blog Cover Image"}
          className="object-cover lg:w-[70%] h-full mx-auto rounded-md"
          sizes="auto, (max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)"
          loading="lazy"
          height={450}
          width={800}
        />

        <p className="text-muted-foreground my-4">{event?.description}</p>

        <Separator className="my-4" />

        <p>{event?.details}</p>

        <Separator className="my-4" />

        <div className="flex justify-center gap-4">
          <Button size={"lg"} variant={"link"} asChild>
            <Link href={`/event/${event.id}`}>Learn More</Link>
          </Button>
          <Button size={"lg"} asChild>
            <Link href={`/event/${event.id}/register`}>Register</Link>
          </Button>
        </div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Participants</h2>
        <Separator className="my-4" />
        <Suspense fallback={<h1>Loading...</h1>}>
          {participants &&
            participants.map((participant: ParticipationType) => (
              <Card key={participant.members[0].name}>
                <CardContent>
                  {participant.members.map((member,i) => (
                    <div key={member.name}>
                      {i !== 0 &&<Separator className="my-2 h-px bg-primary"/>}
                      <h3>{member.name}</h3>
                      <p>{member.email}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
        </Suspense>
      </main>
    </div>
  );
};

export default page;
