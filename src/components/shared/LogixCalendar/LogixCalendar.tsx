import { addMonths, format, getDay, getDaysInMonth, isSameDay, startOfMonth, subMonths } from "date-fns"
import { useEffect, useState, useMemo } from "react"
import { Shipment } from "../../../data/Shipment"
import LogixCalendarCell from "./components/LogixCalendarCell"
import "./LogixCalendar.css"

type logixCalendarType = {
    shipments: Shipment[]
}

const weekDays: String[] = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"]

const LogixCalendar = ({shipments}: logixCalendarType) => {
    const [month, setMonth] = useState(new Date())
    const [monthDays, setMonthDays] = useState<number>(30)

    useEffect(() => {
        setMonthDays(getDaysInMonth(month))
    },[month])

    const nextMonth = () => {
        setMonth(addMonths(month, 1))
    }

    const previousMonth = () => {
        console.log(subMonths(month, 1))
        setMonth(subMonths(month, 1))
    }

    const CalendarBuild = useMemo(() => {
        const startOfTheMonth = startOfMonth(month)
        console.log(startOfTheMonth)
        const weekdayStart = getDay(startOfTheMonth)
        console.log(weekdayStart)
        const emptyArray = new Array(weekdayStart).fill(null)
        const buildArray = [...emptyArray]
        for(var index = 1; index <= monthDays; index++){
            buildArray.push(index)
        }
        return buildArray
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[monthDays, month])

    const actualMonth= useMemo(() => {
        return format(month, 'LLLL');
    },[month])

    const shipmentByDate = (day: number) => {
        if (day) {
            const actualYear = month.getFullYear()
            const actualM = month.getMonth()
            const date = new Date( `${actualM + 1}/${day}/${actualYear}`)
            return shipments.filter(ship => isSameDay(new Date(ship.estimatedArrival), date))
        }
        return []
        
    }

    return <div className="mb-1">
                <p>{actualMonth}</p>
                <button className="mb-1" onClick={() => previousMonth()}>previous month</button>
                <button className="mb-1" onClick={() => nextMonth()}>next month</button>
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