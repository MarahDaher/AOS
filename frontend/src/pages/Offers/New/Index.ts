export const OfferCardInitialValues = {
  general_offer_number: "",
  general_status: "",
  general_profile_description: "",
  general_color: "",
  general_packaging: "",
  general_tool_number: "",
  general_order_number: "",
  general_delivery_type: "",
  general_article_number: "",
};

export const CustomerCardInitialValues = {
  general_customer: "",
  general_customer_contact_person: "",
  general_customer_article_number: "",
  general_request_date: "",
  general_request_number: "",
};

export const HistoryCardInitialValues = {
  general_creation_date: "",
  general_created_by_user_id: "",
};

export const RawMaterialPricesTableInitialValues = {
  general_raw_material_price_total_overwritten: "",
  general_raw_material_purchase_discount: "",
};

export const initialValues = {
  general_comments: "",
};

// Calculation Tab
const quantityFields = [
  "calculation_quantityA",
  "calculation_quantityB",
  "calculation_quantityC",
  "calculation_quantityD",
  "calculation_quantityE",
];

// Initial empty values
export const QuantityStepsCardInitialValues = Object.fromEntries(
  quantityFields.map((field) => [field, ""])
);

// Map from offer
export const mapOfferToQuantityStepsInitialValues = (offerDetails: any) =>
  Object.fromEntries(
    quantityFields.map((field) => [field, offerDetails?.[field] ?? ""])
  );

export const RawMaterialDemandCardInitialValues = {
  calculation_rawmaterialA_absolute_demand: "",
  calculation_rawmaterialB_absolute_demand: "",
  calculation_rawmaterialC_absolute_demand: "",
  calculation_rawmaterialD_absolute_demand: "",
};

//----------Processing per Meter
export const ProcessingPerMeterFields = [
  "calculation_processing_lfm_hourly_rate",
  "calculation_processing_lfm_runtime",
  "calculation_processing_lfm_runtime_factor",
  "calculation_processing_lfm_packing_time",
  "calculation_processing_lfm_packing_time_factor",
  "_calculation_processing_lfm_expense",
  "_calculation_processing_lfm_costs",
];

export const ProcessingPerMeterInitialValues = Object.fromEntries(
  ProcessingPerMeterFields.map((field) => [field, ""])
);
export const mapInitialValues = (offerDetails: any) =>
  Object.fromEntries(
    ProcessingPerMeterFields.map((field) => [
      field,
      offerDetails?.[field] ?? "",
    ])
  );

//--------------------------------------------------------------------
export const ProcessingPerPieceFields = [
  "calculation_processing_piece_hourly_rate",
  "calculation_processing_piece_runtime",
  "calculation_processing_piece_runtime_factor",
  "calculation_processing_piece_packing_time",
  "calculation_processing_piece_packing_time_factor",
  "_calculation_processing_piece_expense",
  "_calculation_processing_piece_costs",
];

export const ProcessingPerPieceInitialValues = Object.fromEntries(
  ProcessingPerPieceFields.map((field) => [field, ""])
);

export const mapPerPieceInitialValuesInitialValues = (offerDetails: any) =>
  Object.fromEntries(
    ProcessingPerPieceFields.map((field) => [
      field,
      offerDetails?.[field] ?? "",
    ])
  );
