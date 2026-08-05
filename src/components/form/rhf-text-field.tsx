import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { useController, useFormContext } from "react-hook-form";

type RhfTextFieldProps = Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText"
> & {
  name: string;
  numeric?: boolean;
};

export const RhfTextField = ({ name, numeric, ...props }: RhfTextFieldProps) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <TextField
      {...field}
      {...props}
      value={numeric && Number.isNaN(value) ? "" : value}
      onChange={(event) =>
        onChange(numeric ? (event.target as HTMLInputElement).valueAsNumber : event.target.value)
      }
      type={numeric ? "number" : props.type}
      error={!!error}
      helperText={error?.message}
      fullWidth
    />
  );
};
