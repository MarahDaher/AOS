import FormInputSaveField from "@components/FormInputSaveField";

const FormFloatField = (props: any) => (
  <FormInputSaveField {...props} numeric={true} integerOnly={false} />
);

export default FormFloatField;
