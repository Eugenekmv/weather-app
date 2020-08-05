export function fromKelToCel(k) {
  return (k - 273.15).toFixed(1);
}

export function pressureToMmhg(hpa) {
  return (hpa / 1.333).toFixed(0);
}
