export function reverseAlphabetOnly(str: string): string {
  if (!str) return str;

  const regexLetterOnly = /[a-zA-Z]/g;

  const alphabets = str.match(regexLetterOnly);

  if (!alphabets) return str;

  const reversedAlphabets = alphabets.reverse();

  let alphabetIndex = 0;
  const putReversedToNum = str.replace(
    regexLetterOnly,
    () => reversedAlphabets[alphabetIndex++]
  );

  console.log(putReversedToNum);

  return putReversedToNum;
}

reverseAlphabetOnly("NEGIE1") // EIGEN1
reverseAlphabetOnly("EMER8IH") // HIRE8ME
