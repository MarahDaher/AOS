import FormInputSaveField from "@components/FormInputSaveField";
import React from "react";

const FormFloatField = (props: any) => (
  <FormInputSaveField {...props} numeric={true} integerOnly={false} />
);

export default FormFloatField;
