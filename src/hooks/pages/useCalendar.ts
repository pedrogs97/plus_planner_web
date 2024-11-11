import { useEffect } from "react"
import { useAuth } from "../useAuth"
import { MessageType } from "@/utils/enums"
import { useWebsocket } from "../useWebsocket";

function useCalendar() {
    const { currentUser } = useAuth()
    const { schedulerClientWB, calendarEvents, setSchedulerClientWB, createSchedulerClientWB } = useWebsocket()


    useEffect(() => {
        if (currentUser?.clinicId && currentUser?.token) {
            createSchedulerClientWB()
        }
    }, [currentUser, setSchedulerClientWB, createSchedulerClientWB])

    useEffect(() => {
        if (schedulerClientWB && currentUser?.clinicId && currentUser?.token && schedulerClientWB?.readyState === WebSocket.OPEN) {
            const message = {
                message_type: MessageType.CONNECTION,
                clinic_id: currentUser.clinicId,
                data: {
                    token: currentUser.token
                }
            }
            schedulerClientWB.send(JSON.stringify(message));
        }

        return () => {
            if (schedulerClientWB?.readyState === WebSocket.OPEN) {
                schedulerClientWB.close()
            }
        }
    }, [schedulerClientWB, currentUser])

    return {
        calendarEvents,
    }
}

export default useCalendar