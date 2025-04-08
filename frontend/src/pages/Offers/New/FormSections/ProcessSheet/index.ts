export const mapOfferDetailsToProcessSheetData = (offerDetails: any) => {
  const order = {
    offer_number: offerDetails ? offerDetails.general_offer_number : "-",
    order_number: offerDetails ? offerDetails.general_order_number : "-",
    customer: offerDetails ? offerDetails.general_customer : "-",
  };

  const profile = {
    name: offerDetails ? offerDetails.general_profile_description : "-",
    tool_number: offerDetails ? offerDetails.general_tool_number : "-",
    customer_article: offerDetails
      ? offerDetails.general_customer_article_number
      : "-",
    aos_article: offerDetails ? offerDetails.general_article_number : "-",
  };

  const processing = {
    speed_actual: offerDetails
      ? offerDetails.calculation_processing_piece_hourly_rate
      : "-",
    weight_actual: offerDetails
      ? offerDetails.calculation_processing_piece_runtime
      : "-",
  };

  //   const raw_materials = offerDetails.raw_materials.map((raw_material) => ({
  //     name: raw_material.general_raw_material_price_total_overwritten,
  //     quantity: raw_material.general_raw_material_purchase_discount,
  //   }));

  return {
    order,
    profile,
    processing,
    // raw_materials,
  };
};
