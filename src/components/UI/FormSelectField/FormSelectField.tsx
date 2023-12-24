import { useFormContext, Controller } from 'react-hook-form';

export type SelectOptions = {
  label: string;
  value: string;
};

interface IInput {
  options?: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
}

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "Select",
  options,
  label,
  defaultValue,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <select
            onChange={onChange}
            value={value}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300
                       transition duration-300 ease-in-out hover:border-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default FormSelectField;
