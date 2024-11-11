import { useEffect, useState } from 'react'
import { CalendarView } from '@/features/Calendar'
import { RIGHT_DRAWER_TYPES } from '@/utils/constants'
import { ICalendarEvent } from '@/interfaces/calendar'
import toast from 'react-hot-toast';
import useCalendar from '@/hooks/pages/useCalendar'


export function Calendar() {
    const [events, setEvents] = useState<Array<ICalendarEvent>>([])
    const { calendarEvents } = useCalendar()

    useEffect(() => {
        setEvents(calendarEvents)
    }, [calendarEvents])
    // Add your own Add Event handler, like opening modal or random event addition
    const addNewEvent = (date: Date | string | null) => {
        console.log(date)
        setEvents([...events])
        toast.success("Evento adicionado com sucesso")
    }

    // Open all events of current day in sidebar 
    const openDayDetail = ({filteredEvents, title}: { filteredEvents: Array<ICalendarEvent>, title: string}) => {
        console.log({header : title, bodyType : RIGHT_DRAWER_TYPES.CALENDAR_EVENTS, extraObject : {filteredEvents}})
    }

    return(
        <CalendarView 
            calendarEvents={events}
            addNewEvent={addNewEvent}
            openDayDetail={openDayDetail}
        />
    )
}
