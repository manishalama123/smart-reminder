import {Calendar as BigCalendar, dateFnsLocalizer} from 'react-big-calendar';
import {format, parse, startOfWeek, getDay} from 'date-fns';
import { Reminder } from '@/types';
import {enUS} from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';  // Make sure this is here

const locales ={
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

interface CalendarProps {
    reminders: Reminder[];
    onSelectSlot: (slotInfo: {start: Date; end: Date}) => void;
    onSelectEvent : (event: any) => void;
}
export default function Calendar({reminders, onSelectSlot, onSelectEvent}: CalendarProps) {
    const events = reminders.map((reminder)=>({
        id: reminder.id,
        title:reminder.title,
        start: new Date(reminder.reminder_datetime),
        end: new Date(reminder.reminder_datetime),
        resource:reminder,
    }));
  return (
    <div className='h-[600px] bg-white p-4 rounded-lg shadow '>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        selectable
        popup
        views={['month', 'week', 'day']}
        defaultView="month"
        />
    </div>
  )
}

