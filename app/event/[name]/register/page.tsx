import EventRegistrationForm from "@/features/event/components/EventRegistrationForm";
import { eventsData } from "@/lib/eventData";

const page = async ({ params }: { params: { name: string } }) => {
  const { name } = await params;
  const event = eventsData.find((event) => event.id === name);
  if (!event) {
    return <h1>Event not found</h1>;
  }
  return (
    <div className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-4">
      <h1>Register for {name}</h1>
     
        <EventRegistrationForm event={event} />
   
    </div>
  );
};

export default page;
