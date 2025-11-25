import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event, eventsData } from "@/lib/eventData";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen container mx-auto pt-12 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <HomeIcon className="size-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Events</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Events
        </h1>
        <main className="space-y-4 my-4">
          {eventsData?.map((event: Event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="text-2xl">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>{event.details}</CardContent>
              <CardFooter>
                <Button variant={"link"} asChild>
                  <Link href={`/event/${event.id}`}>Learn More</Link>
                </Button>
                <Button asChild>
                  <Link href={`/event/${event.id}/register`}>Register</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
      </section>
    </div>
  );
};

export default page;
