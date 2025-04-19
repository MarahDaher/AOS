// 📁 RawMaterialRow.tsx
import {
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, PlaylistAdd } from "@mui/icons-material";
import {
  RawMaterialRow as RawMaterialRowType,
  BaseMaterial,
} from "@interfaces/RawMaterial.model";
import { useOfferContext } from "@contexts/OfferProvider";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { OfferRawMaterialCalculatedApi } from "@api/offer-raw-material";
import { useState } from "react";
import ConfirmationDialog from "@components/ConfirmationDialog";
import { useApiSuccessHandler } from "@hooks/useApiSuccessHandler";
import { useEditableFields } from "@hooks/useEditableFields";

interface RawMaterialRowProps {
  row: RawMaterialRowType;
  index?: number;
  baseMaterials: BaseMaterial[];
  onChangeMaterial: (row: RawMaterialRowType, newMaterialId: number) => void;
  onUpdateField: (
    row: RawMaterialRowType,
    field: keyof RawMaterialRowType,
    value: string | number
  ) => void;
  setRawMaterialRows: React.Dispatch<
    React.SetStateAction<RawMaterialRowType[]>
  >;
  onOpenModal: (row: RawMaterialRowType) => void;
  handleAddMaterial: (newMaterialId: number) => void;
  rawMaterialRows: RawMaterialRowType[];
}

const RawMaterialRow = ({
  row,
  baseMaterials,
  rawMaterialRows,
  onChangeMaterial,
  onUpdateField,
  setRawMaterialRows,
  onOpenModal,
  handleAddMaterial,
}: RawMaterialRowProps) => {
  // Hooks
  const { offerDetails, offerId } = useOfferContext();
  const { showError } = useApiErrorHandler();

  const { showSuccess } = useApiSuccessHandler();

  // Permissions
  const { data: editableFields = [] } = useEditableFields(offerId!);

  const isFieldEditable = (fieldName: string) =>
    editableFields.includes(fieldName);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = async () => {
    if (!row.raw_material_id || !offerDetails?.id) return;

    try {
      await OfferRawMaterialCalculatedApi.deleteRawMaterial(
        offerDetails.id,
        row.raw_material_id
      );
      showSuccess("Rohstoff erfolgreich gelöscht.");
      setRawMaterialRows((prev) =>
        prev.filter(
          (r) =>
            !(
              r.offer_id === offerDetails.id &&
              r.raw_material_id === row.raw_material_id
            )
        )
      );
      setConfirmOpen(false);
    } catch (error) {
      showError(error);
      setConfirmOpen(false);
    }
  };

  const selectedMaterialIds = rawMaterialRows
    .filter(
      (r) =>
        r.raw_material_id !== 0 && r.raw_material_id !== row.raw_material_id
    )
    .map((r) => r.raw_material_id);
  return (
    <TableRow>
      <TableCell>
        <TextField
          select
          fullWidth
          variant="standard"
          value={row.raw_material_id || ""}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            if (!row.raw_material_id) {
              handleAddMaterial(selectedId);
            } else {
              onChangeMaterial(row, selectedId);
            }
          }}
          disabled={!isFieldEditable("raw_material_id")}
        >
          {baseMaterials
            .filter((material) => !selectedMaterialIds.includes(material.id))
            .map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))}
        </TextField>
      </TableCell>

      <TableCell>
        <Typography>{row.type || "-"}</Typography>
      </TableCell>

      {/* Lieferant */}
      <TableCell>
        <TextField
          fullWidth
          disabled={!isFieldEditable("supplier")}
          variant="standard"
          value={row.supplier ?? ""}
          onChange={(e) =>
            updateRowField(setRawMaterialRows, row, "supplier", e.target.value)
          }
          onBlur={(e) => onUpdateField(row, "supplier", e.target.value)}
        />
      </TableCell>

      {/* Anteil [%] */}
      <TableCell>
        <TextField
          type="number"
          variant="standard"
          disabled={!isFieldEditable("share")}
          value={row.share ?? 0}
          onChange={(e) =>
            updateRowField(
              setRawMaterialRows,
              row,
              "share",
              Number(e.target.value)
            )
          }
          onBlur={(e) => onUpdateField(row, "share", Number(e.target.value))}
        />
      </TableCell>

      {/* Preisstand */}
      <TableCell>
        <TextField
          type="month"
          variant="standard"
          disabled={!isFieldEditable("price_date")}
          value={formatPriceDate(row.price_date) ?? ""}
          onChange={(e) =>
            updateRowField(
              setRawMaterialRows,
              row,
              "price_date",
              `${e.target.value}-01`
            )
          }
          onBlur={(e) =>
            onUpdateField(row, "price_date", `${e.target.value}-01`)
          }
        />
      </TableCell>

      {/* Preis [€] */}
      <TableCell>
        <TextField
          fullWidth
          type="number"
          disabled={!isFieldEditable("price")}
          variant="standard"
          value={row.price ?? 0}
          onChange={(e) =>
            updateRowField(setRawMaterialRows, row, "price", e.target.value)
          }
          onBlur={(e) => onUpdateField(row, "price", Number(e.target.value))}
        />
      </TableCell>

      <TableCell>
        <Typography>{row._price_minus_discount ?? "-"}</Typography>
      </TableCell>

      {/* Additive */}
      <TableCell>
        <Typography>{row._additives_concatenated || "-"}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{row._additives_price_sum || "-"}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{row._price_share ?? "-"}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{row._price_minus_discount_share ?? "-"}</Typography>
      </TableCell>

      {/* ➡️ Stack icons horizontally */}
      <TableCell>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => onOpenModal(row)} size="small">
            <PlaylistAdd />
          </IconButton>
          <IconButton
            onClick={() => setConfirmOpen(true)}
            size="small"
            color="error"
            disabled={!isFieldEditable("raw_material_id")}
          >
            <Delete />
          </IconButton>
        </Stack>
      </TableCell>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Rohstoff löschen"
        message="Möchten Sie diesen Rohstoff wirklich löschen?"
        confirmText="Löschen"
        cancelText="Abbrechen"
        danger
      />
    </TableRow>
  );
};

const updateRowField = (
  setRows: React.Dispatch<React.SetStateAction<RawMaterialRowType[]>>,
  row: RawMaterialRowType,
  field: keyof RawMaterialRowType,
  value: any
) => {
  setRows((prev) =>
    prev.map((r) =>
      r.offer_id === row.offer_id && r.raw_material_id === row.raw_material_id
        ? { ...r, [field]: value }
        : r
    )
  );
};

const formatPriceDate = (priceDate?: string): string => {
  if (!priceDate) return "";
  if (priceDate.includes(".")) {
    const parts = priceDate.split(".");
    if (parts.length === 3) return `${parts[2]}-${parts[1]}`;
  } else if (priceDate.includes("-")) {
    return priceDate.slice(0, 7);
  }
  return "";
};

export default RawMaterialRow;
