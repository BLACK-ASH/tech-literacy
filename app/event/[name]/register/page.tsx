import EventRegistrationForm from "@/features/event/components/EventRegistrationForm";
import { eventsData } from "@/lib/eventData";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { name: string } }) => {
  const { name } = await params;
  const event = eventsData.find((event) => event.id === name);
  if (!event) {
    return notFound();
  }
  return (
    <div className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-4">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Register for {name}</h1>
     
        <EventRegistrationForm event={event} />
   
    </div>
  );
};

export default page;
