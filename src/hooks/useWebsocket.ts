import { WebsocketContext } from "@/contexts/WebsocketContext"
import { useContext } from "react"


export const useWebsocket = () => useContext(WebsocketContext)