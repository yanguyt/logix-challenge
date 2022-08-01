import { ReactElement, useEffect, useState } from "react"
import { Box, makeStyles, useTheme } from "@material-ui/core"
import { DataGrid, GridColDef } from "@material-ui/data-grid"
import Loader from 'react-loader-spinner'
import { fetchShipments, FetchShipmentsResult } from "../data/fetch-shipments"

const COLUMNS: GridColDef[] = [
    {
        field: 'houseBillNumber',
        headerName: 'House Bill',
        width: 150
    },
    {
        field: 'client',
        headerName: 'Shipper',
        width: 200
    },
    {
        field: 'origin',
        headerName: 'Origin',
        width: 400
    },
    {
        field: 'destination',
        headerName: 'Destination',
        width: 400
    },
    {
        field: 'mode',
        headerName: 'Mode',
        width: 200
    },
    {
        field: 'estimatedDeparture',
        headerName: 'Estimated Departure',
        width: 200
    },
    {
        field: 'estimatedArrival',
        headerName: 'Estimated Arrival',
        width: 200
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 200
    }
]

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

type LoadingResult = {
    status: 'LOADING'
}
const INITIAL_RESULT: LoadingResult = {
    status: 'LOADING'
}

export const ShipmentsPage: React.FC = () => {
    const classes = useStyles()
    const theme = useTheme()

    const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult | LoadingResult>(INITIAL_RESULT)
    useEffect(() => {
        fetchShipments().then(result => setFetchShipmentsResult(result))
    }, [])

    let component: ReactElement
    switch (fetchShipmentsResult.status) {
        case 'SUCCESS':
            component = <div className="datagrid-container">
                    <DataGrid
                        className={classes.grid}
                        rows={fetchShipmentsResult.shipments}
                        autoPageSize
                        columns={COLUMNS}
                        disableSelectionOnClick
                    />
                </div>
            break;
        case 'LOADING':
            component = <>
                <Box className={classes.loader}>
                    <Loader type="Grid" color={theme.palette.primary.main} />
                </Box >
            </>
            break
        case 'ERROR':
            component = <p>Error</p>
            break
    }

    return <>{component}</>
}