import { getDay, getDaysInMonth, isSameDay, startOfMonth } from "date-fns"
import { useEffect, useState, useMemo } from "react"
import { Shipment } from "../../../data/Shipment"
import LogixCalendarCell from "./components/LogixCalendarCell"
import "./LogixCalendar.css"

type logixCalendarType = {
    shipments: Shipment[]
}

const weekDays: String[] = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"]

const LogixCalendar = ({shipments}: logixCalendarType) => {
    const [actualMonth] = useState(new Date())
    const [monthDays, setMonthDays] = useState<number>(30)

    useEffect(() => {
        setMonthDays(getDaysInMonth(actualMonth))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const CalendarBuild = useMemo(() => {
        const startOfTheMonth = startOfMonth(actualMonth)
        const weekdayStart = getDay(startOfTheMonth)
        const emptyArray = new Array(weekdayStart).fill(null)
        const buildArray = [...emptyArray]
        for(var index = 1; index <= monthDays; index++){
            buildArray.push(index)
        }
        return buildArray
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[monthDays])

    const shipmentByDate = (day: number) => {
        if (day) {
            const actualYear = actualMonth.getFullYear()
            const actualM = actualMonth.getMonth()
            const date = new Date( `${actualM + 1}/${day}/${actualYear}`)
            return shipments.filter(ship => isSameDay(new Date(ship.estimatedArrival), date))
        }
        return []
        
    }

    return <div className="mb-1">
                <div className="container week-header grid grid-template-column-default-calendar">
                    {weekDays.map((wkday, index) => <p key={index} className="weekday-style">{wkday}</p>)}
                </div>
                <div className="grid grid-calendar grid-template-column-default-calendar">
                    {CalendarBuild.map(day => {
                        return <LogixCalendarCell key={day} arrivals={shipmentByDate(day)} day={day}/>
                    })}
                </div>
        </div>
}

export default LogixCalendar