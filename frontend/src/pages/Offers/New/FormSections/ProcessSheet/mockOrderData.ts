const mockData = {
  order: {
    offer_number: "2024-03-002",
    order_number: "A2024-03.002",
    customer: "Mustermann",
  },
  profile: {
    name: "Verbindungsprofil",
    tool_number: "254-003",
    customer_article: "32-43666-4",
    aos_article: "325-443",
  },
  processing: {
    speed_calc: "2,1 m/min",
    speed_actual: "",
    weight_calc: "285,1 g/m",
    weight_actual: "",
  },
  raw_materials: [
    {
      name: "Rohstoff A",
      color: "grau",
      type: "1867-23553",
      supplier: "Lieferant 1",
    },
    {
      name: "Rohstoff B",
      color: "grau",
      type: "1953-6743",
      supplier: "Lieferant 2",
    },
    {
      name: "Rohstoff C",
      color: "weiß",
      type: "5335-65362",
      supplier: "Lieferant 3",
    },
    {
      name: "Rohstoff D",
      color: "schwarz",
      type: "335-4775.1",
      supplier: "Lieferant 1",
    },
  ],
};

export default mockData;
