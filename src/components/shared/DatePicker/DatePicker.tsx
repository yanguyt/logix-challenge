import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { isSameDay } from 'date-fns';
import { isBefore } from 'date-fns/esm';

type DatepickerLogix = {
    label?: string
    value?: Date | null | undefined
    onChange(date: Date | null | undefined): void
    disablePastDate?: Date | null | undefined
}

export default function DatePickerLogix({label, value, onChange, disablePastDate}: DatepickerLogix) {
    const shouldDisalbleDate = (date: Date | undefined): boolean => {
        if (disablePastDate && date && !isSameDay(date, disablePastDate) && isBefore(date , disablePastDate)) {
            return true
        }
        return false
    }
    return (
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
      >
        <DatePicker
            label={label}
            value={value}
            shouldDisableDate={shouldDisalbleDate}
            onChange={(date) => onChange(date)}
            renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }