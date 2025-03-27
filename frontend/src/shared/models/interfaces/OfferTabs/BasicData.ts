export interface OfferForm {
  offerNumber: string; // Angebotsnummer
  status: string; // Status
  profileName: string; // Profilbezeichnung
  color: string; // Farbe
  material: string; // Werkstoff
  dimensionMm: number; // Aufmachung [mm]
  articleNumber: string; // Artikelnummer
  toolNumber: string; // Werkzeugnummer
  deliveryType: string; // Lieferart
  orderNumber: string; // Auftragsnummer
}

export interface CustomerForm {
  customer: string; // Kunde
  requestDate: string; // Anfrage vom
  contactPerson: string; // Ansprechpartner
  requestNumber: string; // Anfragenummer
  customerArticleNumber: string; // Artikelnummer Kunde
}

export interface History {
  createdAt: string; // erstellt am
  createdBy: string; // erstellt von
}
