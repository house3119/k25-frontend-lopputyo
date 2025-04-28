import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
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
          center: "prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[ dayGridPlugin, interactionPlugin ]} 
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        eventContent={event => <EventItem training={event} />}
        />
        
    </>
  )
}

const EventItem = ({ training }) => {
  const { event } = training;
  return (
    <>
      <div style={{whiteSpace: 'normal', fontSize: '0.9em'}} className='pb-1'>{format(event.start, 'h:mm')}-{format(event.end, 'h:mm')}<br></br> {event.title}</div>
    </>
  );
};