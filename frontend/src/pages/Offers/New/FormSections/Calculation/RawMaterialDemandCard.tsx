// 📁 RawMaterialDemandCard.tsx
import { FC, useEffect, useCallback } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputField from "@components/FormInputField";
import { Divider } from "@mui/material";
import { CARD_HEIGHT } from "@utils/constantValue";
import { FormikProvider, useFormik } from "formik";
import { OfferRawMaterialCalculatedModel } from "@interfaces/RawMaterial.model";
import { useOfferContext } from "@contexts/OfferProvider";
import { useRawMaterials } from "@hooks/useRawMaterialsDemand";
import debounce from "lodash.debounce";
import { usePermissions } from "@hooks/usePermissions";

interface FormValues {
  raw_materials: OfferRawMaterialCalculatedModel[];
  raw_materials_total: number;
}

const RawMaterialDemandCard: FC = () => {
  const offerId = useOfferContext().offerId;
  const { data, updateRawMaterial, refetch } = useRawMaterials(offerId!);
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("calculation");

  const emptyMaterial = (id: number): OfferRawMaterialCalculatedModel => ({
    raw_material_id: id,
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
    id,
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      raw_materials: Array.from({ length: 4 }, (_, i) => emptyMaterial(i + 1)),
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

  useEffect(() => {
    if (data) {
      const filledData = [...data];

      while (filledData.length < 4) {
        filledData.push(emptyMaterial(filledData.length + 1));
      }

      formik.setValues({
        raw_materials: filledData,
        raw_materials_total: filledData.reduce(
          (sum, item) => sum + (item.absolut_demand ?? 0),
          0
        ),
      });
    }
  }, [data]);

  const debouncedUpdate = useCallback(
    debounce(
      (
        rawMaterialId: number,
        field: "absolut_demand" | "share",
        value: number
      ) => {
        updateRawMaterial(
          {
            rawMaterialId: rawMaterialId,
            data: { [field]: value },
          },
          {
            onSuccess: () => {
              refetch();
            },
          }
        );
      },
      500
    ),
    []
  );

  const handleBlur = (index: number, field: "absolut_demand" | "share") => {
    const item = formik.values.raw_materials[index];
    if (!item) return;

    const originalItem = data?.find(
      (d) => d.raw_material_id === item.raw_material_id
    );
    const currentValue = item[field];
    const originalValue = originalItem ? originalItem[field] : undefined;

    if (currentValue === originalValue) {
      return; // ❌ Skip API if no real change
    }

    let updatedMaterials = [...formik.values.raw_materials];

    if (field === "absolut_demand") {
      updatedMaterials[index].absolut_demand = item.absolut_demand;

      const totalDemand = updatedMaterials.reduce(
        (sum, material) => sum + (material.absolut_demand ?? 0),
        0
      );

      if (totalDemand > 0) {
        updatedMaterials = updatedMaterials.map((material) => ({
          ...material,
          share: material.absolut_demand
            ? parseFloat(
                ((material.absolut_demand / totalDemand) * 100).toFixed(2)
              )
            : 0,
        }));
      }
    }

    formik.setFieldValue("raw_materials", updatedMaterials);

    if (item.raw_material_id) {
      debouncedUpdate(item.raw_material_id, field, Number(currentValue));
    }
  };

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, []);

  return (
    <FormikProvider value={formik}>
      <CardBox label="Flächen - Rohstoffbedarf" height={CARD_HEIGHT}>
        {formik.values.raw_materials.map((item, index) => {
          const isDisabled = !item.name;
          return (
            <Grid
              container
              spacing={2}
              key={`${item.raw_material_id}-${index}`}
              pt={index !== 0 ? "4px" : 0}
            >
              <Grid size={{ xs: 6, md: 6 }}>
                <FormInputField
                  name={`raw_materials.${index}.absolut_demand`}
                  label={`Rohstoff ${index + 1} [mm²]`}
                  type="number"
                  onBlur={() => handleBlur(index, "absolut_demand")}
                  disabled={isDisabled || !isEditable}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 6 }}>
                <FormInputField
                  name={`raw_materials.${index}.share`}
                  label={`Rohstoff ${index + 1} [%]`}
                  type="number"
                  onBlur={() => handleBlur(index, "share")}
                  disabled
                />
              </Grid>
            </Grid>
          );
        })}

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
      </CardBox>
    </FormikProvider>
  );
};

export default RawMaterialDemandCard;
