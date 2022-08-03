import { DataGrid, GridColDef, GridRowData } from "@material-ui/data-grid"
import { makeStyles } from "@material-ui/styles"

interface DatagridInterface {
    columns?: GridColDef[]
    data: GridRowData[]
}

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

const DatagridLogix = ({columns = COLUMNS, data}:DatagridInterface) => {
    const classes = useStyles()
    return (
        <DataGrid className={classes.grid} 
        rows={data}
        autoPageSize
        columns={columns}
        disableSelectionOnClick/>
    )
}

export default DatagridLogix