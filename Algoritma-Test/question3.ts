function ArrayItemcounter(input: string[], query: string[]): number[] {
  const result: number[] = [];
  for (let [indexQ, q] of query.entries()) {
    const filtering = input.filter((inp) => inp === q);
    result[indexQ] = filtering.length;
  }

  console.log(result);
  return result;
}

ArrayItemcounter(["xc", "dz", "bbb", "dz"], ["bbb", "ac", "dz"]); // [1, 0, 2]
ArrayItemcounter(
  ["ab", "r5", "www", "we", "wa", "ab", "we", "www", "bb", "www", "we"],
  ["we", "r5", "www", "ab"]
); // [3, 1, 3, 2]
