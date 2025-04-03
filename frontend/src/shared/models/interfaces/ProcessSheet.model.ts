export interface ProcessSheetModel {
  order: {
    offer_number: string;
    order_number: string;
    customer: string;
  };
  profile: {
    name: string;
    tool_number: string;
    customer_article: string;
    aos_article: string;
  };
  processing: {
    speed_calc: string;
    speed_actual: string;
    weight_calc: string;
    weight_actual: string;
  };
  raw_materials: {
    name: string;
    color: string;
    type: string;
    supplier: string;
  }[];
}
