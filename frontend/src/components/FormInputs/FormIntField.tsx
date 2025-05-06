import FormInputSaveField from "@components/FormInputSaveField";

const FormIntField = (props: any) => (
  <FormInputSaveField {...props} numeric={true} integerOnly={true} />
);

export default FormIntField;
