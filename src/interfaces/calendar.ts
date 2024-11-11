export interface ICalendarEvent {
    startTime?: string;
    endTime?: string;
    title: string;
    theme: string;
}

export interface ICalendarViewProps {
    calendarEvents: ICalendarEvent[];
    addNewEvent: (date: Date | string | null) => void;
    openDayDetail: ({filteredEvents, title}: {filteredEvents: ICalendarEvent[], title: string}) => void;
}