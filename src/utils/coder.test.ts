import { decrypt, encrypt, fromBase38, toBase38 } from './coder.ts';

function randomString(length: number): string {
  return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 128))).join('');
}

const ALPHABET = '-0123456789_abcdefghijklmnopqrstuvwxyz';
function randomBase38String(length: number): string {
  return Array.from({ length }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
}

function randLen(min = 1, max = 10000) {
  const minLog = Math.log10(min),
    maxLog = Math.log10(max);
  return Math.floor(Math.pow(10, Math.random() * (maxLog - minLog) + minLog));
}

const PASS = '✅ PASS';
const FAIL = '❌ FAIL';

let allPassed = true;

console.log('=== coder.ts roundtrip tests ===\n');

console.log('-- encrypt / decrypt --');
for (let t = 0; t < 10; ++t) {
  const len = randLen(2); // len=1 is not supported
  const m = randomString(len);
  const k = randomString(randLen(1, 20));

  const encryptDecrypt = decrypt(encrypt(m, k), k) === m;
  const decryptEncrypt = encrypt(decrypt(m, k), k) === m;

  allPassed &&= encryptDecrypt && decryptEncrypt;

  console.log(
    `  len=${String(len).padStart(5)}, keyLen=${String(k.length).padStart(2)}:  m==decrypt(encrypt(m)) ${encryptDecrypt ? PASS : FAIL}   m==encrypt(decrypt(m)) ${decryptEncrypt ? PASS : FAIL}`,
  );
}

console.log();
console.log('-- toBase38 / fromBase38 --');
for (let t = 0; t < 10; t++) {
  const len = randLen();
  const s = randomString(len);
  const fromToBase38 = fromBase38(toBase38(s)) === s;
  allPassed &&= fromToBase38;
  console.log(
    `  len=${String(len).padStart(5)} (str->base38->str):    s==fromBase38(toBase38(s)) ${fromToBase38 ? PASS : FAIL}`,
  );

  const len38 = randLen();
  const s38 = randomBase38String(len38);
  const toFromBase38 = toBase38(fromBase38(s38)) === s38;
  allPassed &&= toFromBase38;
  console.log(
    `  len=${String(len38).padStart(5)} (base38->str->base38): s==toBase38(fromBase38(s)) ${toFromBase38 ? PASS : FAIL}`,
  );
}

console.log();
console.log(`=== ${allPassed ? '✅ All tests passed' : '❌ Some tests failed'} ===`);
