import { ReactElement, useEffect, useState } from "react"
import { Box, makeStyles, useTheme } from "@material-ui/core"
import Loader from 'react-loader-spinner'
import { fetchShipments, FetchShipmentsResult, INITIAL_RESULT, RequestStatus } from "../data/fetch-shipments"
import DatagridLogix from "../components/shared/Datagrid/Datagrid"

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



export const ShipmentsPage: React.FC = () => {
    const classes = useStyles()
    const theme = useTheme()

    const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult >(INITIAL_RESULT)

    const getShipmentDetails = () => {
        setFetchShipmentsResult(INITIAL_RESULT)
        fetchShipments().then((res: FetchShipmentsResult) => {
           setFetchShipmentsResult(res)
        })
    } 

    
    useEffect(() => {
        getShipmentDetails()
    }, [])

    let component: ReactElement
    switch (fetchShipmentsResult.status) {
        case RequestStatus.SUCCESS:
            component = <div className="datagrid-container">
                    <DatagridLogix data={fetchShipmentsResult.shipments}/>
                </div>
            break;
        case RequestStatus.LOADING:
            component = <>
                <Box className={classes.loader}>
                    <Loader type="Grid" color={theme.palette.primary.main} />
                </Box >
            </>
            break
        case RequestStatus.ERROR:
            component = <div className="flex justify-center">
            <div className="mt-4">
                <p className="text-center">error</p>
                <p className="button-default" onClick={() => getShipmentDetails()}> Try Again </p>
            </div>
        </div>    
            break
    }

    return <>{component}</>
}