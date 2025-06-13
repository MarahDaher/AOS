export interface OfferCalculated {
  id: number;
  general_status:
    | "Vorkalkulation"
    | "Angebot"
    | "Auftrag"
    | "Produziert"
    | "Versandt"
    | null;
  general_offer_number: string | null;
  general_profile_description: number | null;
  general_creation_date: string;
  general_created_by_user_id: number;
  general_color: string | null;
  general_packaging: number | null;
  general_tool_number: string | null;
  general_order_number: string | null;
  general_delivery_type: "frei" | "unfrei" | null;
  general_article_number: string | null;
  general_customer: string | null;
  general_customer_contact_person: string | null;
  general_customer_article_number: string | null;
  general_request_date: string | null;
  general_request_number: number | null;
  general_profile_crosssection: number | null;
  general_raw_material_price_total_overwritten: number | null;
  general_raw_material_purchase_discount: number | null;
  general_comments: string | null;

  calculation_quantityA: number | null;
  calculation_quantityB: number | null;
  calculation_quantityC: number | null;
  calculation_quantityD: number | null;
  calculation_quantityE: number | null;

  calculation_processing_lfm_hourly_rate: number | null;
  calculation_processing_piece_hourly_rate: number | null;
  calculation_processing_lfm_runtime: number | null;
  calculation_processing_piece_runtime: number | null;
  calculation_processing_lfm_runtime_factor: number | null;
  calculation_processing_piece_runtime_factor: number | null;
  calculation_processing_lfm_packing_time: number | null;
  calculation_processing_piece_packing_time: number | null;
  calculation_processing_lfm_packing_time_factor: number | null;
  calculation_processing_piece_packing_time_factor: number | null;

  calculation_additional_setup_time: number | null;
  calculation_additional_hourly_rate: number | null;
  calculation_additional_transport_costs_total: number | null;
  calculation_additional_box_count: number | null;
  calculation_additional_box_price_per_piece: number | null;
  calculation_additional_box_price_flat_additional: number | null;
  calculation_additional_single_print: number | null;
  calculation_additional_single_print_price: number | null;

  calculation_working_setup_quantity_relative: number | null;
  runningcard_extrusion_speed_IST: number | null;
  calculation_working_annual_requirement_estimated: number | null;
  calculation_working_tool_costs_total: number | null;
  calculation_working_tool_costs_customer: number | null;
  calculation_working_tool_costs_amortization_years: number | null;
  calculation_working_allocation_costs_additional: number | null;
  calculation_working_profile_cross_section_deviation_lower: number | null;
  calculation_working_profile_cross_section_deviation_upper: number | null;
  calculation_working_setup_quantity_total: number | null;
  calculation_working_hourly_rate: number | null;
  calculation_working_additional_costs: number | null;
  calculation_working_commission: number | null;
  calculation_working_profit: number | null;
  calculation_working_discount: number | null;

  pricing_annual_requirement: number;
  pricing_graduated_calculation_additional_setup_quantity: number;

  pricing_grad_qtyB_add_hourlyrate: number | null;
  pricing_grad_qtyC_add_hourlyrate: number | null;
  pricing_grad_qtyD_add_hourlyrate: number | null;
  pricing_grad_qtyE_add_hourlyrate: number | null;

  pricing_grad_qtyB_add_setupcosts: number | null;
  pricing_grad_qtyC_add_setupcosts: number | null;
  pricing_grad_qtyD_add_setupcosts: number | null;
  pricing_grad_qtyE_add_setupcosts: number | null;

  pricing_grad_qtyB_add_transport: number | null;
  pricing_grad_qtyC_add_transport: number | null;
  pricing_grad_qtyD_add_transport: number | null;
  pricing_grad_qtyE_add_transport: number | null;

  pricing_machine_utilization_annual_machine_capacity: number | null;

  pricing_piece_length_prices_length1: number | null;
  pricing_piece_length_prices_length2: number | null;
  pricing_piece_length_prices_length3: number | null;
  pricing_piece_length_prices_length4: number | null;
  pricing_piece_length_prices_length5: number | null;

  [key: string]: any; // 👈 هذا عشان كل الفيلدات اللي تبدأ بـ _calculation أو _pricing
  created_by_user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role_id: number;
  };
}
