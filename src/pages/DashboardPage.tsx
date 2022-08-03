import { Box, useTheme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useEffect, useMemo, useState } from "react"
import Loader from "react-loader-spinner"
import DatagridLogix from "../components/shared/Datagrid"
import MenuFilter from "../components/shared/FilterMenu"
import {  fetchShipmentsByDateAndHouseNumber, FetchShipmentsResult, INITIAL_RESULT, RequestStatus } from "../data/fetch-shipments"

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
    const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult>(INITIAL_RESULT)

    const getShipmentDetails = () => {
        fetchShipmentsByDateAndHouseNumber({}).then((res: FetchShipmentsResult) => {
           setFetchShipmentsResult(res)
        })
    }

    useEffect(() => {
        getShipmentDetails()
    },[])


    const ComponentToShow = useMemo(() => {
        switch (fetchShipmentsResult.status) {
            case RequestStatus.ERROR:
                return <p>Error</p>        
            case RequestStatus.SUCCESS: 
                return <div className="datagrid-container">
                    <DatagridLogix data={fetchShipmentsResult.shipments} />
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


    return <div className="page-container">
        <MenuFilter/>
        {ComponentToShow}
    </div>
}