import { AspectRatio } from "@/components/ui/aspect-ratio";
import { colorMap, type Event } from "@/lib/eventData";
import { cn } from "@/lib/utils";
import Image from "next/image";

const EventDetailSectionSlide = ({ event }: { event: Event }) => {
  return (
    <section
      id={event.id}
      className={cn(
        "min-h-screen max-h-screen overflow-hidden",
        colorMap[event.bgColor]
      )}
    >
      <h2 className="text-4xl md:text-6xl lg:text-8xl text-primary-foreground font-bold text-center py-4 md:py-12">
        {event.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AspectRatio className="size-80 md:size-3/4 mx-auto" ratio={5 / 4}>
          <Image fill src={event.image} alt={event.title} className="object-contain"></Image>
        </AspectRatio>
        <div className="pt-8">
          <p className="text-primary-foreground text-center font-normal md:text-3xl">{event.description}</p>
        </div>
      </div>
    </section>
  );
};

export default EventDetailSectionSlide;
