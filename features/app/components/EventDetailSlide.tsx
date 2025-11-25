import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { colorMap, type Event } from "@/lib/eventData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const EventDetailSlide = ({ event }: { event: Event }) => {
  return (
    <section
      id={event.id}
      className={cn(
        "min-h-screen max-h-screen overflow-hidden event-slide",
        colorMap[event.bgColor]
      )}
    >
      <h2 className="text-4xl md:text-6xl lg:text-8xl text-primary-foreground font-bold text-center py-4 md:py-12">
        {event.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AspectRatio className="size-80 md:size-3/4 mx-auto" ratio={5 / 4}>
          <Image
            fill
            src={event.image}
            alt={event.title}
            className="object-contain"
          ></Image>
        </AspectRatio>
        <div className="px-4 py-12 flex flex-col gap-8 justify-around">
          <p className="text-primary-foreground text-center font-normal md:text-3xl">
            {event.description}
          </p>
          <div className="flex justify-center gap-4">
            <Button size={"lg"} variant={"link"} asChild>
              <Link className="text-primary-foreground" href={`/event/${event.id}`}>Learn More</Link>
            </Button>
            <Button size={"lg"} asChild>
              <Link href={`/event/${event.id}/register`}>Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailSlide;
