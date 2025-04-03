import { Card, CardContent, Typography, Box } from "@mui/material";

type Row = { label: string; value: string };

interface Props {
  title: string;
  rows: Row[];
}

export default function InfoCard({ title, rows }: Props) {
  return (
    <Card
      elevation={2}
      sx={{ height: "100%", boxShadow: 3, borderRadius: "4px" }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        {rows.map(({ label, value }) => (
          <Box key={label} display="flex" justifyContent="space-between">
            <Typography>{label}:</Typography>
            <Typography>{value || "-"}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
