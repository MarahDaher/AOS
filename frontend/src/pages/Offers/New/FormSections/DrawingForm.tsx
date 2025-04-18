import { OffersApi } from "@api/offers";
import CardBox from "@components/CardBox";
import { useOfferContext } from "@contexts/OfferProvider";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { Drawing } from "@interfaces/Drawing.model";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid2";
import ClearIcon from "@mui/icons-material/Clear";
import { usePermissions } from "@hooks/usePermissions";

interface DrawingFormProps {}

const DrawingForm: FunctionComponent<DrawingFormProps> = () => {
  const { offerId, drawingFile, setDrawingFile } = useOfferContext();

  const { showError } = useApiErrorHandler();
  const { canEdit, canView } = usePermissions();
  const isEditable = canEdit("drawing");
  const isViewable = canView("drawing");

  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDrawing = async () => {
    try {
      const res = await OffersApi.getDrawing(offerId!);
      setDrawing(res);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDrawingFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // show preview
    }
  };

  const handleUpload = async () => {
    if (!drawingFile) return;
    setUploading(true);
    try {
      await OffersApi.storeDrawing(offerId!, drawingFile);
      setDrawingFile(null);
      setPreviewUrl(null); // reset after upload
      await fetchDrawing(); // fetch the saved one
    } catch (err) {
      showError(err);
    }
    setUploading(false);
  };

  useEffect(() => {
    fetchDrawing();
  }, [offerId]);

  if (!isViewable) return null;

  return (
    <CardBox>
      <Grid container spacing={2}>
        {/* Left Column – Drawing Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body1">
            <strong>Dateiname:</strong>{" "}
            {drawing?.filename || <em>Kein Dokument vorhanden</em>}
          </Typography>
          <Typography variant="body1" pt={2}>
            <strong>Stand Zeichnung:</strong>{" "}
            {drawing?.upload_date ? (
              new Date(drawing.upload_date).toLocaleDateString("de-DE")
            ) : (
              <em>-</em>
            )}
          </Typography>
        </Grid>

        {/* Right Column – Upload Area */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box display="flex" alignItems="center" justifyContent="end" gap={2}>
            {/* Hidden file input */}
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* TextField styled like Figma */}
            <TextField
              variant="outlined"
              size="small"
              label="neue Datei"
              value={drawingFile?.name || ""}
              placeholder="PDF auswählen"
              InputProps={{
                readOnly: true,
                sx: {
                  width: "400px",
                  borderRadius: 1,
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
                startAdornment: isEditable && drawingFile && (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => {
                        setDrawingFile(null);
                        setPreviewUrl(null);
                      }}
                      edge="start"
                      size="small"
                      aria-label="Datei entfernen"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: isEditable && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => fileInputRef.current?.click()}
                      edge="end"
                      size="small"
                      aria-label="Datei auswählen"
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Upload Button */}
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!drawingFile || uploading || !isEditable}
            >
              Hochladen
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* PDF Preview */}
      {previewUrl ? (
        <Box mt={3}>
          <Typography variant="subtitle1" mb={1}>
            Vorschau der ausgewählten Datei:
          </Typography>
          <iframe
            src={previewUrl}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc" }}
          ></iframe>
        </Box>
      ) : drawing?.preview_url ? (
        <Box mt={3}>
          <Typography variant="subtitle1" mb={1}>
            Gespeicherte Zeichnung:
          </Typography>
          <iframe
            src={drawing.preview_url}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc" }}
          ></iframe>
        </Box>
      ) : null}
    </CardBox>
  );
};

export default DrawingForm;
