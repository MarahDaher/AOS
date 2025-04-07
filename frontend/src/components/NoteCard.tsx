import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid2";

interface NoteCardProps {
  field: any;
  label: string;
}

const NoteCard: FunctionComponent<NoteCardProps> = ({ field, label }) => {
  const { offerDetails } = useOfferContext();

  const formik = useFormik({
    initialValues: {
      [field]: offerDetails?.[field] ?? "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label={label}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name={field}
              label=""
              multiline
              minRows={3}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default NoteCard;
