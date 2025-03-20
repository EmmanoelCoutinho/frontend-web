export function transformToOptionArray(arr: string[]) {
  return arr.flatMap((item) => {
    return { title: item, value: item };
  });
}
