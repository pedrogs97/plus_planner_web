import { useEffect, useState } from "react";
import  ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import  ChevronRightIcon  from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import { CALENDAR_EVENT_STYLE } from "@/utils/constants";
import { ICalendarEvent, ICalendarViewProps } from "@/interfaces/calendar";

const THEME_BG = CALENDAR_EVENT_STYLE

export function CalendarView({calendarEvents, addNewEvent, openDayDetail} : Readonly<ICalendarViewProps>){

    const today = moment().startOf('day')
    const weekdays: Array<string> = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const colStartClasses: Array<string> = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month'))
    const [events, setEvents] = useState<Array<ICalendarEvent>>([])

    useEffect(() => {
        setEvents(calendarEvents)
    }, [calendarEvents])
    

    const allDaysInMonth = ()=> {
        const start = moment(firstDayOfMonth).startOf('week')
        const end = moment(moment(firstDayOfMonth).endOf('month')).endOf('week')
        const days = [];
        let day = start;
        while (day <= end) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days
    }

    const getEventsForCurrentDate = (date: string) => {
        let filteredEvents = events.filter((e) => {return moment(date).isSame(moment(e.startTime), 'day') } )
        if(filteredEvents.length > 2){
            const originalLength = filteredEvents.length
            filteredEvents = filteredEvents.slice(0, 2)
            filteredEvents.push({title : `${originalLength - 2} more`, theme : "MORE"})
        }
        return filteredEvents
    }

    const openAllEventsDetail = (date: string, theme: string) => {
        if(theme != "MORE")return 1
        const filteredEvents = events.filter((e) => {return moment(date).isSame(moment(e.startTime), 'day') } ).map((e) => {return {title : e.title, theme : e.theme}})
        openDayDetail({filteredEvents, title : moment(date).format("D MMM YYYY")})
    }

    const isToday = (date: string) => {
        return moment(date).isSame(moment(), 'day');
    }

    const isDifferentMonth = (date: string) => {
        return moment(date).month() != moment(firstDayOfMonth).month() 
    }

    const getPrevMonth = () => {
        const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfPrevMonth)
    };

    const getCurrentMonth = () => {
        const firstDayOfCurrMonth = today.startOf('month');
        setFirstDayOfMonth(firstDayOfCurrMonth)
    };

    const getNextMonth = () => {
        const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfNextMonth)
    };
 
    return(
        <div className="w-full  bg-base-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
            <div className="flex  justify-normal gap-2 sm:gap-4">
            <p className="font-semibold text-xl w-48">
                        {moment(firstDayOfMonth).format("MMMM yyyy").toString()}<span className="text-xs ml-2 ">Beta</span>
                    </p>

                        <button className="btn  btn-square btn-sm btn-ghost"  onClick={getPrevMonth}><ChevronLeftIcon
                        className="w-5 h-5"
                        
                        /></button>
                        <button className="btn  btn-sm btn-ghost normal-case" onClick={getCurrentMonth}>
                        
                        Current Month</button>
                        <button className="btn btn-square btn-sm btn-ghost" onClick={getNextMonth}><ChevronRightIcon
                        className="w-5 h-5"
                        
                        /></button>
                </div>
                <div>
                    <button className="btn  btn-sm btn-ghost btn-outline normal-case" onClick={() => addNewEvent(null)}>Add New Event</button>
                </div>
                
            </div>
            <div className="my-4 divider" />
            <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
                {weekdays.map((day, key) => {
                    return (
                    <div  className="text-xs capitalize" key={`${day}_${key}`}>
                        {day}
                    </div>
                    );
                })}
            </div>

                
            <div className="grid grid-cols-7 mt-1  place-items-center">
                {allDaysInMonth().map((day, idx) => {
                    return (
                        <div key={`${day}_${idx}`} className={colStartClasses[moment(day).day()] + " border border-solid w-full h-28  "}>
                            <button className={`flex items-center  justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ${isToday(day.toISOString()) && " bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white"} ${isDifferentMonth(day.toISOString()) && " text-slate-400 dark:text-slate-600"}`} onClick={() => addNewEvent(day)}> { moment(day).format("D") }</button>
                            {
                                getEventsForCurrentDate(day.toISOString()).map((e, k) => {
                                    return <button key={`${day}_${k}`} onClick={() => openAllEventsDetail(day.toISOString(), e.theme)} className={`text-xs px-2 mt-1 truncate ${THEME_BG[e.theme]} `}>{e.title}</button>
                                })
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
