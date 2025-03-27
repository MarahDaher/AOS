export const initialValues = {
  general_offer_number: "",
  general_status: "",
  general_material: "",
  general_profile_description: "",
  general_color: "",
  general_packaging: "",
  general_tool_number: "",
  general_order_number: "",
  general_delivery_type: "",
  general_article_number: "",

  // Kunde
  general_customer: "",
  general_customer_contact_person: "",
  general_customer_article_number: "",
  general_request_date: "",
  general_request_number: "",

  // Histo
  general_creation_date: new Date().toISOString(),
  general_created_by_user_id: 1,

  // Rohstoffpreise
  general_raw_materialA_id: null,
  general_raw_materialB_id: null,
  general_raw_materialC_id: null,
  general_raw_materialD_id: null,

  general_raw_materialA_supplier: "",
  general_raw_materialB_supplier: "",
  general_raw_materialC_supplier: "",
  general_raw_materialD_supplier: "",

  general_raw_materialA_share: null,
  general_raw_materialB_share: null,
  general_raw_materialC_share: null,
  general_raw_materialD_share: null,

  general_raw_material_price_total_overwritten: null,
  general_raw_material_purchase_discount: null,

  general_comments: "",
};
