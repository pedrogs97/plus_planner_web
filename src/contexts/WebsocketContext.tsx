import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { IWebsocketContext, IMessage } from "@/interfaces/context";
import { ICalendarEvent } from '@/interfaces/calendar'
import Queue from "@/interfaces/queue";
import { MessageType } from "@/utils/enums";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";

export const WebsocketContext = createContext<IWebsocketContext>({
    setSchedulerClientWB: () => {},
    createSchedulerClientWB: () => {},
    schedulerClientWB: null,
})

export function WebsocketProvider ({children}: Readonly<{children: ReactNode}>) {
    const { currentUser, updateCurrentUser } = useAuth()
    const [schedulerClientWB, setSchedulerClientWB] = useState<WebSocket | null>(null)
    const [calendarType, setCalendarType] = useState(MessageType.GET_FULL_MONTH_CALENDAR)
    const [calendarEvents, setCalendarEvents] = useState<Array<ICalendarEvent>>([])
    const messageQueue = Queue.instance

    const getFullMonthCalendar = useCallback(() => {
        const message = {
            message_type: MessageType.GET_FULL_MONTH_CALENDAR,
            clinic_id: currentUser?.clinicId,
            data: null
        }
        schedulerClientWB?.send(JSON.stringify(message));
    }, [schedulerClientWB, currentUser])

    const sendConnectionMessage = useCallback(() => {
        if (schedulerClientWB?.readyState === WebSocket.OPEN) {
            const message = {
                message_type: MessageType.CONNECTION,
                clinic_id: currentUser?.clinicId,
                data: {
                    token: currentUser?.token,
                    uuid: currentUser?.uuid_scheduler,
                    clinicId: currentUser?.clinicId
                }
            }
            schedulerClientWB.send(JSON.stringify(message));
        }
    }, [schedulerClientWB, currentUser])

    const createSchedulerClientWB = useCallback(() => {
        if (!schedulerClientWB || schedulerClientWB?.readyState === WebSocket.CLOSED) {
            setSchedulerClientWB(new WebSocket(`ws://localhost:8002/scheduler/`));
        }
    }, [schedulerClientWB])

    const retryConnection = useCallback(() => {
        if (schedulerClientWB?.readyState === WebSocket.OPEN) {
            schedulerClientWB.close()
            createSchedulerClientWB()
        }
    }, [schedulerClientWB, createSchedulerClientWB])
    
    useEffect(() => {
        function processMessage(mesage: IMessage) {
            console.log('processMessage', mesage)
            switch (mesage.messageType) {
                case MessageType.GET_FULL_MONTH_CALENDAR:
                    setCalendarEvents(mesage.data as Array<ICalendarEvent>)
                    break;
                case MessageType.GET_FULL_WEEK_CALENDAR:
                    setCalendarEvents(mesage.data as Array<ICalendarEvent>)
                    break;
                case MessageType.GET_DAY_CALENDAR:
                    setCalendarEvents(mesage.data as Array<ICalendarEvent>)
                    break;
                case MessageType.ADD_EVENT:
                    setCalendarEvents((prev) => [...prev, mesage.data as ICalendarEvent])
                    break;
                case MessageType.EDIT_EVENT:
                    setCalendarEvents((prev) => prev.map((event) => event?.id === mesage.data?.id ? mesage.data as ICalendarEvent : event))
                    break;
                case MessageType.REMOVE_EVENT:
                    setCalendarEvents((prev) => prev.filter((event) => event?.id !== mesage.data?.id))
                    break;
                case MessageType.INVALID:
                    toast.error("Recarregue a página")
                    // retryConnection()
                    break;
                case MessageType.DISCONNECT:
                    toast.error("Calendário desconectado")
                    break;
                case MessageType.CREATE_UUID:
                    updateCurrentUser({ ...currentUser, uuid: mesage.data.uuid as string })
                    break;
                case MessageType.CONNECTION:
                    getFullMonthCalendar()
                    break;
                default:
                    break;
            }
        }
        // console.log('messageQueue', messageQueue.size())
        if (messageQueue.size() > 0) {
            const message = messageQueue.dequeue()
            if (typeof message !== "string") {
                processMessage(message)
            }
        }
    }, [messageQueue, getFullMonthCalendar, updateCurrentUser, currentUser, retryConnection])

    function mainLoop() {
        while (true) {
            if (messageQueue.size() > 0) {
                const message = messageQueue.dequeue()
                if (typeof message !== "string") {
                    console.log('message', message)
                }
            }
            set
        }
    }

    useEffect(() => {
        if (schedulerClientWB && messageQueue) {
            schedulerClientWB.onopen = () => {
                sendConnectionMessage()
            }

            schedulerClientWB.onmessage = (event) => {
                const data = JSON.parse(event.data)
                messageQueue.enqueue(data)
            }  
        }
    }, [schedulerClientWB, messageQueue, sendConnectionMessage])
    

    const value = useMemo(() => {
        return {
            schedulerClientWB,
            calendarType,
            calendarEvents,
            setSchedulerClientWB,
            createSchedulerClientWB,
            setCalendarType,
        }
    }, [setSchedulerClientWB, createSchedulerClientWB, setCalendarType, schedulerClientWB, calendarType, calendarEvents])

    return (
        <WebsocketContext.Provider value={value}>
            {children}
        </WebsocketContext.Provider>
    )

}