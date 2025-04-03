// mock/finalPriceData.ts
const finalPriceMock = {
  calculation: {
    zeitkosten: 245.24,
    rohstoffpreis: 358.16,
    ruestzeit: 126,
    verpackung: 48.6,
    transport: 100,
    druck: 5,
    konfektion1: 242.47,
    konfektion2: 0,
    zusatz: 0,
    provision: 0,
    gewinn: 178,
    zahlungsziel: 0,
    summe: 1303.47,
  },
  staffelpreise: [
    {
      staffel: "A",
      menge: 500,
      staffel_m: 1.92,
      staffel_stk: 3.07,
      stueck: 313,
    },
    {
      staffel: "B",
      menge: 1000,
      staffel_m: 1.69,
      staffel_stk: 2.7,
      stueck: 625,
    },
    {
      staffel: "C",
      menge: 2500,
      staffel_m: 1.54,
      staffel_stk: 2.46,
      stueck: 1563,
    },
    {
      staffel: "D",
      menge: 5000,
      staffel_m: 1.49,
      staffel_stk: 2.3,
      stueck: 3125,
    },
  ],
};

export default finalPriceMock;
