import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import FormSelectSaveField from "@components/FormSelectSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { Roles } from "@enums/Roles.enum";
import { useFieldEditable } from "@hooks/useFieldEditable";
import { useOfferContext } from "@contexts/OfferProvider";
import { usePermissions } from "@hooks/usePermissions";
import { UsersApi } from "@api/users";
import FormIntField from "@components/FormInputs/FormIntField";

type OptionGroup = {
  group: string;
  options: {
    label: string;
    value: number;
  }[];
};

const WorkHoursCard: FunctionComponent = () => {
  const { offerDetails, offerId } = useOfferContext();

  // Permissions
  // Permissions
  const { isFieldEditable } = useFieldEditable(offerId!);
  const { canEdit } = usePermissions();
  const isEditable = canEdit("process_sheet");
  const formik = useFormik({
    initialValues: {
      runningcard_hourlyrecording_construction:
        offerDetails?.runningcard_hourlyrecording_construction ?? "",
      runningcard_hourlyrecording_toolwork:
        offerDetails?.runningcard_hourlyrecording_toolwork ?? "",
      runningcard_hourlyrecording_entry:
        offerDetails?.runningcard_hourlyrecording_entry ?? "",
      runningcard_hourlyrecording_entrystitches:
        offerDetails?.runningcard_hourlyrecording_entrystitches ?? "",
      runningcard_hourlyrecording_entrydriver_user_id:
        offerDetails?.runningcard_hourlyrecording_entrydriver_user_id ?? "",
      runningcard_hourlyrecording_toolmaker_user_id:
        offerDetails?.runningcard_hourlyrecording_toolmaker_user_id ?? "",
      _runningcard_hourlyrecording_total:
        offerDetails?._runningcard_hourlyrecording_total ?? "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  // State
  const [userOptions, setUserOptions] = useState<OptionGroup[]>([]);

  // Fetch users
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await UsersApi.getAllUsers();

        if (response && Array.isArray(response)) {
          const admins = response.filter((u) => u.role?.name === Roles.ADMIN);
          const productions = response.filter(
            (u) => u.role?.name === Roles.PRODUCTION
          );

          const formatUser = (u: any) => ({
            label: `${u.name} (${u.email})`,
            value: u.id,
          });

          const groupedOptions: OptionGroup[] = [];

          if (admins.length > 0) {
            groupedOptions.push({
              group: "Administratorin",
              options: admins.map(formatUser),
            });
          }

          if (productions.length > 0) {
            groupedOptions.push({
              group: "Produktion",
              options: productions.map(formatUser),
            });
          }

          setUserOptions(groupedOptions);
        }
      } catch (err) {
        console.error("Failed to load users", err);
      }
    }

    loadUsers();
  }, []);

  return (
    <FormikProvider value={formik}>
      <CardBox label="Stundenerfassung">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormIntField
              name="runningcard_hourlyrecording_construction"
              label="Konstruktion [min]"
              disabled={
                !isFieldEditable("runningcard_hourlyrecording_construction") ||
                !isEditable
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormIntField
              name="runningcard_hourlyrecording_toolwork"
              label="Werkzeug-/Kalibrierungsbau [min]"
              disabled={
                !isFieldEditable("runningcard_hourlyrecording_toolwork") ||
                !isEditable
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormIntField
              name="runningcard_hourlyrecording_entry"
              label="Einfahren [min]"
              disabled={
                !isFieldEditable("runningcard_hourlyrecording_entry") ||
                !isEditable
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormInputSaveField
              name="_runningcard_hourlyrecording_total"
              label="Gesamt"
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormIntField
              name="runningcard_hourlyrecording_entrystitches"
              label="Einfahrstiche"
              disabled={
                !isFieldEditable("runningcard_hourlyrecording_entrystitches") ||
                !isEditable
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormSelectSaveField
              name="runningcard_hourlyrecording_entrydriver_user_id"
              label="Einfahrer"
              options={userOptions}
              disabled={
                !isFieldEditable(
                  "runningcard_hourlyrecording_entrydriver_user_id"
                ) || !isEditable
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormSelectSaveField
              name="runningcard_hourlyrecording_toolmaker_user_id"
              label="Werkzeugmacher"
              options={userOptions}
              disabled={
                !isFieldEditable(
                  "runningcard_hourlyrecording_toolmaker_user_id"
                ) || !isEditable
              }
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default WorkHoursCard;
