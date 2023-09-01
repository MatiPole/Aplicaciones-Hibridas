export function multiplicarTabla(num) {
  for (let i = 1; i <= 12; i++) {
    const result = num * i;
    console.log(`${num} x ${i} = ${result}`);
  }
}

import { parImpar } from "./common.cjs";

console.log(parImpar(12));
