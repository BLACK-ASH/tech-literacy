import Marquee from "@/components/Marquee";
import { eventsData } from "@/lib/eventData";
import { StarIcon } from "lucide-react";

const Home = () => {
  return (
    <div className="">
      <section className="h-screen">
        <div className="h-6 pt-12">
          <Marquee className="rotate-3 p-2 my-4 text-primary font-bold uppercase text-2xl md:text-3xl" direction="right">
            <div className="flex items-center gap-6">
              <p >CS Department</p>
              <StarIcon className="fill-primary" />
            </div>
            <div className="flex items-center gap-6">
              <p >2nd December</p>
              <StarIcon className="fill-primary" />
            </div>
            <div className="flex items-center gap-6">
              <p >8 AM Onwards</p>
              <StarIcon className="fill-primary" />
            </div>
            <div className="flex items-center gap-6">
              <p >CS Department</p>
              <StarIcon className="fill-primary" />
            </div>
            <div className="flex items-center gap-6">
              <p >2nd December</p>
              <StarIcon className="fill-primary" />
            </div>
            <div className="flex items-center gap-6">
              <p >8 AM Onwards</p>
              <StarIcon className="fill-primary" />
            </div>
          </Marquee>
        </div>

        <div className="min-h-[calc(80vh-6rem)] flex flex-col items-center justify-center my-4">
          <h1 className="font-bold uppercase text-center text-4xl md:text-6xl xl:text-7xl text-pretty text-primary mb-4">Tech Literacy Day 2025</h1>
          <h2 className="font-bold uppercase text-center text-2xl md:text-4xl xl:text-6xl text-pretty text-primary-foreground bg-primary leading-tight px-2">Empowering Tomorrow Through Digital Knowledge </h2>
        </div>

        <div className="h-6">
          <Marquee className="bg-primary text-primary-foreground p-2 my-4 -rotate-3 font-bold uppercase text-2xl md:text-3xl" speed={40}>
            {eventsData?.map((event) => (
              <div className="flex items-center gap-6" key={event.id}>
                <p >{event.title}</p>
                <StarIcon className="fill-primary-foreground" />
              </div>
            ))}
          </Marquee>
        </div>

      </section>
    </div>
  );
};

export default Home;
