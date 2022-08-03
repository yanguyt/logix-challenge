import { useMemo } from "react";
import { Shipment } from "../../../../data/Shipment";
import "../LogixCalendar.css"
import LogixCalendarCellTag from "./LogixCalendarCellTag";

type LogixCalendarCellType = {
    day: number;
    arrivals: Shipment[]
}

const LogixCalendarCell = ({day, arrivals}: LogixCalendarCellType) => {
    const isSameDayFc = useMemo(() => {
        return day === new Date().getDate()
    },[day])
    return (
        <div className={`cell ${isSameDayFc ? "bg-light-blue" : ""}`}>
            <p className="text-right date-cell-style">{day}</p>
            {arrivals.map(arr => <LogixCalendarCellTag key={arr.id} shipment={arr}/>)}
        </div>
    )
}

export default LogixCalendarCell