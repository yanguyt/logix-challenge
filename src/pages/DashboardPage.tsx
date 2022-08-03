import { Box, useTheme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useEffect, useMemo, useState } from "react"
import Loader from "react-loader-spinner"
import FilterMenu from "../components/shared/FilterMenu/FilterMenu"
import LogixCalendar from "../components/shared/LogixCalendar/LogixCalendar"
import {   fetchShipmentsByDateAndHouseNumber, FetchShipmentsResult, FilterOptions, INITIAL_RESULT, RequestStatus } from "../data/fetch-shipments"


const useStyles = makeStyles({
    grid: {
        marginInline: 16,
        height: '100%'
    },
    loader: {
        margin: 'auto',
        width: 'fit-content',
        marginTop: 200
    }
})

export const DashboardPage: React.FC = () => {
    const classes = useStyles()
    const theme = useTheme()
    const [filter, setfilter] = useState<FilterOptions>({})
    const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult>(INITIAL_RESULT)
    const getShipmentDetails = () => {
        setFetchShipmentsResult(INITIAL_RESULT)
        fetchShipmentsByDateAndHouseNumber(filter).then((res: FetchShipmentsResult) => {
           setFetchShipmentsResult(res)
        })
    } 

    useEffect(() => {
        getShipmentDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    useEffect(() => {
        getShipmentDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const changeShipmentStatus = (status: string) => {
        setfilter({...filter, status: status === 'ALL' ? '' : status })
    }

    const ComponentToShow = useMemo(() => {
        switch (fetchShipmentsResult.status) {
            case RequestStatus.ERROR:
                return <div className="flex justify-center">
                    <div className="mt-4">
                        <p className="text-center">error</p>
                        <p className="button-default" onClick={() => getShipmentDetails()}> Try Again </p>
                    </div>
                </div>        
            case RequestStatus.SUCCESS: 
                return <div className="pb-1">
                    <LogixCalendar shipments={fetchShipmentsResult.shipments}/>
                </div>
            case RequestStatus.LOADING:
                return <>
                <Box className={classes.loader}>
                    <Loader type="Grid" color={theme.palette.primary.main} />
                </Box >
            </>
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fetchShipmentsResult])


    return <div >
        <FilterMenu changeStatusShip={changeShipmentStatus}/>
        {ComponentToShow}
    </div>
}