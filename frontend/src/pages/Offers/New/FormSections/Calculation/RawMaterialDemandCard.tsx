import { FC, useEffect } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputField from "@components/FormInputField";
import { Divider } from "@mui/material";
import { CARD_HEIGHT } from "@utils/constantValue";
import { FormikProvider, useFormik } from "formik";
import { OfferRawMaterialCalculatedModel } from "@interfaces/RawMaterial.model";
import { useOfferContext } from "@contexts/OfferProvider";
import { useRawMaterials } from "@hooks/useRawMaterialsDemand";

interface FormValues {
  raw_materials: OfferRawMaterialCalculatedModel[];
  raw_materials_total: number;
}

const RawMaterialDemandCard: FC = () => {
  const offerId = useOfferContext().offerId;
  const { data, isLoading, updateRawMaterial, refetch } = useRawMaterials(
    offerId!
  );
  // Default 4 blank raw materials
  const defaultRawMaterials: OfferRawMaterialCalculatedModel[] = Array.from(
    { length: 4 },
    (_, i) => ({
      raw_material_id: i + 1,
      offer_id: offerId!,
      absolut_demand: 0,
      share: 0,
      name: "",
      supplier: "",
      price: 0,
      price_date: "",
      _price_minus_discount: 0,
      _price_share: 0,
      _price_minus_discount_share: 0,
      density: 0,
      type: "",
      id: i + 1,
    })
  );

  const formik = useFormik<FormValues>({
    initialValues: {
      raw_materials: defaultRawMaterials,
      raw_materials_total: 0,
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    const total = formik.values.raw_materials.reduce(
      (sum, item) => sum + (item.absolut_demand ?? 0),
      0
    );

    if (formik.values.raw_materials_total !== total) {
      formik.setFieldValue("raw_materials_total", total);
    }
  }, [formik.values.raw_materials]);

  const handleBlur = (index: number, field: "absolut_demand" | "share") => {
    const item = formik.values.raw_materials[index];
    if (!item) return;

    const payload: Partial<OfferRawMaterialCalculatedModel> = {
      [field]: item[field],
      // all_raw_material_ids: formik.values.raw_materials.map((m) => m.raw_material_id),
    };

    updateRawMaterial(
      {
        rawMaterialId: item.raw_material_id,
        data: payload,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (data && data.length > 0) {
      formik.setValues({
        raw_materials: data,
        raw_materials_total: data.reduce(
          (sum, item) => sum + (item.absolut_demand ?? 0),
          0
        ),
      });
    }
  }, [data]); //

  return (
    <FormikProvider value={formik}>
      <CardBox label="Flächen - Rohstoffbedarf" height={CARD_HEIGHT}>
        <Grid container spacing={1}>
          {formik.values.raw_materials.map((item, index) => (
            <Grid
              container
              spacing={2}
              key={item.raw_material_id}
              pt={index !== 0 ? "4px" : 0}
            >
              <Grid size={{ xs: 6, md: 6 }}>
                <FormInputField
                  name={`raw_materials.${index}.absolut_demand`}
                  label={`Rohstoff ${index + 1} [mm²]`}
                  type="number"
                  onBlur={() => handleBlur(index, "absolut_demand")}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 6 }}>
                <FormInputField
                  name={`raw_materials.${index}.share`}
                  label={`Rohstoff ${index + 1} [%]`}
                  type="number"
                  onBlur={() => handleBlur(index, "share")}
                />
              </Grid>
            </Grid>
          ))}

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1, borderColor: "black" }} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormInputField
              name="raw_materials_total"
              label="Gesamt [mm²]"
              disabled
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default RawMaterialDemandCard;
