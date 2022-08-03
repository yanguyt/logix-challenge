import { Shipment } from "../../../../data/Shipment"
import Plane from "../../../../assets/icons/plane-solid.svg"
import Rail from "../../../../assets/icons/train-solid.svg"
import Ship from "../../../../assets/icons/ship-solid.svg"
import { useMemo } from "react"
type LogixCalendarCellTagType = {
    shipment: Shipment
}
const LogixCalendarCellTag = ({shipment}: LogixCalendarCellTagType) => {

    const LogoToUse = useMemo(() => {
        switch (shipment.mode) {
            case 'AIR':
                return Plane;
            case 'RAIL': 
                return Rail
            default:
                return Ship
        }
    },[shipment])

    return <div className="cell-tag">
        <div className="flex justify-center">
            <div className="transport-type">
                <img src={LogoToUse} alt="" />
            </div>
        </div>
        
        <div className="flex justify-between mb-1">
            <p className="font-bold text-xss text-white">{shipment.houseBillNumber}</p>
            <p className="text-xss text-white">{shipment.status}</p>
        </div>
        
        <p className="text-xss font-light text-white line-clamp">{shipment.destination}</p>
        
    </div>
}

export default LogixCalendarCellTag