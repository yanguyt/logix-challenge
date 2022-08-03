
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { useState } from "react"
import { ShipmentStatus } from "../../../data/Shipment"
import "./filterMenu.css"

type FilterMenuType = {
    changeStatusShip(value: string): void
}

const FilterMenu = ({changeStatusShip}: FilterMenuType) => {
    const [statusShip, setStatusShip] = useState<ShipmentStatus | 'ALL'>('ALL')
    const handleChange = (event: any) => {
        setStatusShip(event.target.value)
        changeStatusShip(event.target.value)
    }
    return <div className="filter-menu-container">
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Shipment status</InputLabel>
                    <Select
                        className="w-250"
                        autoWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusShip}
                        label="Shipment status"
                        onChange={handleChange}
                    >
                        <MenuItem value={'ALL'}>ALL</MenuItem>
                        <MenuItem value={"TRANSPORT_ERROR"}>TRANSPORT_ERROR</MenuItem>
                        <MenuItem value={"ARRIVED"}>ARRIVED</MenuItem>
                        <MenuItem value={"IN_TRANSIT"}>IN_TRANSIT</MenuItem>
                        <MenuItem value={"ROLL_OVER"}>ROLL_OVER</MenuItem>
                        <MenuItem value={"CANCELLED"}>CANCELLED</MenuItem>
                        <MenuItem value={"CUSTOMS_HOLD"}>CUSTOMS_HOLD</MenuItem>
                    </Select>
                    </FormControl>
            </div>
}

export default FilterMenu