import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useController, useFormContext } from "react-hook-form";

type RhfDatePickerProps = Omit<DatePickerProps, "value" | "onChange"> & {
  name: string;
};

export const RhfDatePicker = ({ name, ...props }: RhfDatePickerProps) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <DatePicker
      {...field}
      {...props}
      format="DD/MM/YYYY"
      slotProps={{
        textField: {
          fullWidth: true,
          error: !!error,
          helperText: error?.message,
        },
      }}
    />
  );
};
