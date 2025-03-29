import { OffersModel } from "@interfaces/Offers.model";
import { Column } from "@types/Table";

export const OfferColumns: Column<OffersModel>[] = [
  { label: "Angebotsnummer", render: (row) => row.general_offer_number },
  { label: "Auftraggeber", render: (row) => row.general_customer },
  {
    label: "Profilbezeichnung",
    render: (row) => row.general_profile_description,
  },
  { label: "Erstelldatum", render: (row) => row.general_creation_date },
];
