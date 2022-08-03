export enum ShipmentModeEnum {
    AIR = 'AIR',
    SEA = 'SEA',
    RAIL = 'RAIL'
}  

export type ShipmentMode = 'AIR' | 'SEA' | 'RAIL'

export type ShipmentStatus = 'TRANSPORT_ERROR' | 'ARRIVED' | 'IN_TRANSIT' | 'ROLL_OVER' | 'CANCELLED' | 'CUSTOMS_HOLD'

export type Shipment = {
    id: string
    client: string
    origin: string
    destination: string
    mode: ShipmentMode | ShipmentModeEnum
    estimatedDeparture: string
    estimatedArrival: string
    status: ShipmentStatus
    houseBillNumber: string
}