import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from 'react';
import dataService from '../../services/data-service';
import { format } from "date-fns";
import { Training } from '../../models/training';

export default function TrainingCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getTrainingData();
  }, [])

  const getTrainingData = async () => {
    dataService.getAllTrainings2().then(result => {
      setEvents(result.map((e: Training) => {
        const date1 = new Date(e.date)
        const date2 = new Date(e.date)
        date2.setTime(date1.getTime() + (e.duration * 60 * 1000))

        return({
            title: `${e.activity} / ${e.customerFirstName} ${e.customerLastName}`,
            start: date1,
            end: date2
          })
      }))
    });
  }

  return(
    <>
      <FullCalendar
        editable
        selectable
        events={events}
        headerToolbar={{
          end: "dayGridMonth dayGridWeek dayGridDay prev next",
        }}
        plugins={[ dayGridPlugin, interactionPlugin ]} 
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        eventContent={event => <EventItem training={event} />}
      />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventItem = ({ training }) => {
  const { event } = training;
  return (
    <>
      <div style={{whiteSpace: 'normal', fontSize: '0.9em'}} className='pb-1'>{format(event.start, 'H:mm')}-{format(event.end, 'H:mm')}<br></br> {event.title}</div>
    </>
  );
};
