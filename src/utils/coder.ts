const S = [
    83, 104, 101, 114, 108, 111, 99, 107, 32, 68, 121, 109, 48, 60, 21, 69, 40, 97, 59, 52, 81, 85, 91, 43, 67, 89, 115,
    126, 56, 123, 34, 84, 75, 122, 1, 70, 100, 96, 9, 16, 44, 53, 5, 61, 35, 116, 88, 37, 11, 42, 49, 110, 57, 93, 19,
    90, 105, 8, 80, 27, 18, 3, 4, 29, 36, 2, 12, 38, 41, 7, 10, 103, 98, 125, 119, 24, 95, 6, 71, 106, 15, 117, 102,
    112, 33, 0, 22, 82, 86, 92, 127, 124, 76, 17, 45, 54, 62, 50, 58, 94, 20, 28, 30, 13, 39, 120, 25, 72, 118, 113, 23,
    87, 77, 46, 55, 63, 51, 31, 14, 26, 73, 78, 47, 64, 74, 79, 65, 66,
  ],
  N = S.length; // 128

export function encrypt(m: string, k: string): string {
  const M = Array.from(m, c => c.charCodeAt(0)),
    K = Array.from(k, c => c.charCodeAt(0));
  const ml = M.length,
    kl = K.length;

  const E = Array.from<number>({ length: ml });
  E[0] = (M[0] + S[K[0]]) % N;
  for (let i = 1; i < ml; ++i) E[i] = (M[i] + S[(K[i % kl] + E[i - 1] + i) % N]) % N;

  E[ml - 1] = (E[ml - 1] + S[(K[(ml - 1) % kl] + E[0]) % N]) % N; // doesn't work if ml==1, this is fine
  for (let i = ml - 2; i >= 0; --i) E[i] = (E[i] + S[(K[i % kl] + E[i + 1] + i) % N]) % N;

  return E.map(c => String.fromCharCode(c)).join('');
}

export function decrypt(e: string, k: string): string {
  const E = Array.from(e, c => c.charCodeAt(0)),
    K = Array.from(k, c => c.charCodeAt(0));
  const el = E.length,
    kl = K.length;

  for (let i = 0; i < el - 1; ++i) E[i] = (E[i] - S[(K[i % kl] + E[i + 1] + i) % N] + N) % N;
  E[el - 1] = (E[el - 1] - S[(K[(el - 1) % kl] + E[0]) % N] + N) % N;

  const M = Array.from<number>({ length: el });
  M[0] = (E[0] - S[K[0]] + N) % N;
  for (let i = 1; i < el; ++i) M[i] = (E[i] - S[(K[i % kl] + E[i - 1] + i) % N] + N) % N;

  return M.map(c => String.fromCharCode(c)).join('');
}

const ALPHABET = '-0123456789_abcdefghijklmnopqrstuvwxyz';
const CHAR_TO_CODE = new Uint8Array(128);
for (let i = 0; i < ALPHABET.length; ++i) CHAR_TO_CODE[ALPHABET.charCodeAt(i)] = i;

export function toBase38(str: string): string {
  const len = str.length;
  if (len === 0) return '';

  let num = 0n;
  let leadingZerors = 0,
    countingZeroes = true;
  for (let i = 0; i < len; ++i) {
    const code = str.charCodeAt(i);
    if (countingZeroes && code === 0) ++leadingZerors;
    else {
      countingZeroes = false;
      num = (num << 7n) | BigInt(code);
    }
  }

  if (num === 0n) return ALPHABET[0].repeat(leadingZerors);

  const stack: string[] = [];
  while (num > 0n) {
    stack.push(ALPHABET[Number(num % 38n)]);
    num /= 38n;
  }
  return ALPHABET[0].repeat(leadingZerors) + stack.reverse().join('');
}

export function fromBase38(str: string): string {
  const len = str.length;
  if (len === 0) return '';

  let num = 0n;
  let leadingZerors = 0,
    countingZeroes = true;
  for (let i = 0; i < len; ++i) {
    const code = CHAR_TO_CODE[str.charCodeAt(i)];
    if (countingZeroes && code === 0) ++leadingZerors;
    else {
      countingZeroes = false;
      num = num * 38n + BigInt(code);
    }
  }

  if (num === 0n) return '\0'.repeat(leadingZerors);

  const stack: string[] = [];
  while (num > 0n) {
    stack.push(String.fromCharCode(Number(num & 127n)));
    num >>= 7n;
  }
  return '\0'.repeat(leadingZerors) + stack.reverse().join('');
}
