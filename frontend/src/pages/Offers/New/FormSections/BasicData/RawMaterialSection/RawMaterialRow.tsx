// 📁 RawMaterialRow.tsx
import {
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  RawMaterialRow as RawMaterialRowType,
  BaseMaterial,
} from "@interfaces/RawMaterial.model";
import { PlaylistAdd } from "@mui/icons-material";

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
  onUpdateRawMaterial: (
    id: number,
    field: keyof RawMaterialRowType,
    value: string | number
  ) => void;
  setRawMaterialRows: React.Dispatch<
    React.SetStateAction<RawMaterialRowType[]>
  >;
  onOpenModal: (row: RawMaterialRowType) => void;
}

const RawMaterialRow = ({
  row,
  baseMaterials,
  onChangeMaterial,
  onUpdateField,
  onUpdateRawMaterial,
  setRawMaterialRows,
  onOpenModal,
}: RawMaterialRowProps) => (
  <TableRow>
    <TableCell>
      <TextField
        select
        fullWidth
        variant="standard"
        value={row.raw_material_id || ""}
        onChange={(e) => onChangeMaterial(row, Number(e.target.value))}
      >
        {baseMaterials.map((m) => (
          <MenuItem key={m.id} value={m.id}>
            {m.name}
          </MenuItem>
        ))}
      </TextField>
    </TableCell>

    <TableCell>
      <Typography>{row.type || "-"}</Typography>
    </TableCell>

    <TableCell>
      <TextField
        fullWidth
        variant="standard"
        value={row.supplier || ""}
        onChange={(e) =>
          updateRowField(setRawMaterialRows, row, "supplier", e.target.value)
        }
        onBlur={(e) => onUpdateField(row, "supplier", e.target.value)}
      />
    </TableCell>

    <TableCell>
      <TextField
        fullWidth
        type="number"
        variant="standard"
        value={row.share}
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

    <TableCell>
      <TextField
        type="month"
        fullWidth
        variant="standard"
        value={formatPriceDate(row.price_date)}
        onChange={(e) =>
          updateRowField(
            setRawMaterialRows,
            row,
            "price_date",
            `${e.target.value}-01`
          )
        }
        onBlur={(e) =>
          onUpdateRawMaterial(
            row.raw_material_id,
            "price_date",
            `${e.target.value}-01`
          )
        }
      />
    </TableCell>

    <TableCell>
      <TextField
        fullWidth
        type="number"
        variant="standard"
        value={row.price}
        onChange={(e) =>
          updateRowField(setRawMaterialRows, row, "price", e.target.value)
        }
        onBlur={(e) =>
          onUpdateRawMaterial(
            row.raw_material_id,
            "price",
            Number(e.target.value)
          )
        }
      />
    </TableCell>

    <TableCell>
      <TextField
        fullWidth
        variant="standard"
        value={row.additive || ""}
        onChange={(e) =>
          updateRowField(setRawMaterialRows, row, "additive", e.target.value)
        }
        onBlur={(e) =>
          onUpdateRawMaterial(row.raw_material_id, "additive", e.target.value)
        }
      />
    </TableCell>

    <TableCell>
      <TextField
        fullWidth
        type="number"
        variant="standard"
        value={row.price_additive || ""}
        onChange={(e) =>
          updateRowField(
            setRawMaterialRows,
            row,
            "price_additive",
            e.target.value
          )
        }
        onBlur={(e) =>
          onUpdateRawMaterial(
            row.raw_material_id,
            "price_additive",
            Number(e.target.value)
          )
        }
      />
    </TableCell>

    <TableCell>
      <Typography>{row.price_total ?? "-"}</Typography>
    </TableCell>

    <TableCell>
      <Typography>{row._price_minus_discount ?? "-"}</Typography>
    </TableCell>

    <TableCell>
      <Typography>{row._price_share ?? "-"}</Typography>
    </TableCell>

    <TableCell>
      <Typography>{row._price_minus_discount_share ?? "-"}</Typography>
    </TableCell>

    <TableCell>
      <IconButton onClick={() => onOpenModal(row)}>
        <PlaylistAdd />
      </IconButton>
    </TableCell>
  </TableRow>
);

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
