import FormInputSaveField from "@components/FormInputSaveField";
import React from "react";

const FormIntField = (props: any) => (
  <FormInputSaveField {...props} numeric={true} integerOnly={true} />
);

export default FormIntField;
