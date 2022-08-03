import { format } from 'date-fns'
import { Shipment } from "./Shipment"
import { SHIPMENTS_DATA } from './shipments-data'

export enum RequestStatus {
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
    LOADING = "LOADING"
}

type ErrorResult = {
    status: RequestStatus.ERROR
    message: string
}

type SuccessResult = {
    status: RequestStatus.SUCCESS
    shipments: Shipment[]
}

type LoadingResult = {
    status: RequestStatus.LOADING
}

export type FilterOptions = {
    arrivalTime?: Date
    houseBill?: string
    status?: string
}

export const INITIAL_RESULT: LoadingResult = {
    status: RequestStatus.LOADING
}

export type FetchShipmentsResult =
    | ErrorResult
    | SuccessResult
    | LoadingResult

// To make your life easier, we'll adjust the dates to be more current
const millisToAdd = new Date().getTime() - new Date("4/19/19").getTime()
const adjustDateString = (dateString: string): string => {
    const originalTimeInMillis = new Date(dateString).getTime()
    const newTimeInMillis = originalTimeInMillis + millisToAdd
    const adjustedDate = new Date(newTimeInMillis)
    return format(adjustedDate, 'MM/dd/yy')
}

const adjustShipmentDates = (shipments: Shipment[]): Shipment[] => shipments.map(shipment => ({
    ...shipment,
    estimatedArrival: adjustDateString(shipment.estimatedArrival),
    estimatedDeparture: adjustDateString(shipment.estimatedDeparture)
}))

// Feel free to change this constant to a really high % during your testing to
// make sure your failure handling works, and to a low number while you're
// developing / testing your success case
const FAILURE_RATIO = 0.05

const setTimeoutAsync = async (millis: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, millis))
}

export const fetchShipments = async (): Promise<FetchShipmentsResult> => {
    const waitTimeMillis = 200 + 1800 * Math.random()
    await setTimeoutAsync(waitTimeMillis)
    const shouldFail = Math.random() < FAILURE_RATIO
    if (shouldFail) {
        return {
            status: RequestStatus.ERROR,
            message: 'Something went wrong'
        }
    }
    return {
        status: RequestStatus.SUCCESS,
        shipments: adjustShipmentDates(SHIPMENTS_DATA)
    }
}

export const fetchShipmentsByDateAndHouseNumber = async ({houseBill = "", status = ""}: FilterOptions): Promise<FetchShipmentsResult> => {
    const waitTimeMillis = 200 + 1800 * Math.random()
    await setTimeoutAsync(waitTimeMillis)
    const shouldFail = Math.random() < FAILURE_RATIO
    if (shouldFail) {
        return {
            status: RequestStatus.ERROR,
            message: 'Something went wrong'
        }
    }

    const shipmentDataFiltered: Shipment[] = adjustShipmentDates(SHIPMENTS_DATA).filter((ship:Shipment) => {
        return ship.houseBillNumber.includes(houseBill) && ship.status.includes(status)
        
    })

    return {
        status: RequestStatus.SUCCESS,
        shipments: shipmentDataFiltered
    }
}