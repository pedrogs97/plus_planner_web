'use client'

import { CALENDAR_EVENT_STYLE } from "@/utils/constants"

export function CalendarEventsBodyRightDrawer({ filteredEvents } : Readonly<{ filteredEvents: Array<{title: string, theme: string}> }>) {
    return(
        <>
             {
                filteredEvents.map((e, k) => {
                    return <div key={`${e.theme}_${k}`} className={`grid mt-3 card  rounded-box p-3 ${CALENDAR_EVENT_STYLE[e.theme || "MORE"] || ""}`}>
                            {e.title}
                        </div> 
                })
            }
        </>
    )
}
