

import { useCategoriesQuery } from "@/redux/api/categoryApi";
import FormSelectField, { SelectOptions } from "../FormSelectField/FormSelectField";

type ACCategoryFieldProps = {
  name: string;
  label?: string;
};

const ACCategoryField = ({ name, label }: ACCategoryFieldProps) => {
  const { data, isLoading } = useCategoriesQuery();
  const categoryData = data?.data;
  const acDepartmentOptions = categoryData?.map((acCategory: any) => {
    console.log(acCategory?.id,'ccccchc');
    return {
      label: acCategory?.title,
      value: acCategory?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
    />
  );
};

export default ACCategoryField;
