import GeometricBackground from "@/components/GeometricBackground";
import Marquee from "@/components/Marquee";
import EventDetailSection from "@/features/app/components/EventDetailSection";
import { colorMap, eventsData } from "@/lib/eventData";
import { StarIcon } from "lucide-react";

const EventDayDetails = [
  {
    id: 1,
    label: "CS Department",
  },
  {
    id: 2,
    label: "2nd December",
  },
  {
    id: 3,
    label: "9 AM Onwards",
  },
];

const Home = () => {
  return (
    <div className="box-border max-w-screen overflow-x-hidden">
      <section className="min-h-screen">
        <div className="">
          <Marquee className="-rotate-3 mt-10 p-2 bg-primary text-primary-foreground font-chewy uppercase text-2xl md:text-3xl">
            {EventDayDetails.map((event) => (
              <div className="flex items-center gap-6" key={event.id}>
                <p>{event.label}</p>
                <StarIcon className="fill-primary-foreground" />
              </div>
            ))}
            {EventDayDetails.map((event) => (
              <div className="flex items-center gap-6" key={event.id}>
                <p>{event.label}</p>
                <StarIcon className="fill-primary-foreground" />
              </div>
            ))}
          </Marquee>
        </div>
        <GeometricBackground>
          <div className="h-[50vh] md:min-h-[calc(65vh-6rem)] flex flex-col items-center justify-center">
            <h1 className=" uppercase text-center text-4xl md:text-6xl xl:text-8xl text-pretty bg-primary text-primary-foreground mb-4 font-chewy px-4 py-2 rounded">
              Tech Literacy Day
            </h1>
            <h2 className="uppercase text-center text-2xl md:text-4xl xl:text-6xl text-pretty text-primary leading-tight px-2">
              Empowering Tomorrow Through Digital Knowledge{" "}
            </h2>
            <div>
              <p className="text-center text-lg md:text-xl xl:text-4xl text-pretty text-primary leading-tight px-2">
                Join Us on 2nd December, 2025
              </p>
            </div>
          </div>
        </GeometricBackground>

        <div className="">
          <Marquee
            className=" p-2 my-4 -rotate-3 uppercase text-2xl md:text-3xl font-chewy"
            direction="right"
            speed={40}
          >
            {eventsData?.map((event) => (
              <div className="flex items-center gap-6" key={event.id}>
                <p
                  className={`${
                    colorMap[event.bgColor]
                  } py-2 px-5 text-primary-foreground rounded-full `}
                >
                  {event.title}
                </p>
                <StarIcon className="text-primary size-8" />
              </div>
            ))}
          </Marquee>
        </div>
      </section>
      <EventDetailSection events={eventsData} />
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
    </div>
  );
};

export default Home;
