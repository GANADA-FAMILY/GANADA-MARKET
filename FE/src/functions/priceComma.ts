function priceComma(price: number) {
  /*
  10000 -> 10,000
  */
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export { priceComma };
