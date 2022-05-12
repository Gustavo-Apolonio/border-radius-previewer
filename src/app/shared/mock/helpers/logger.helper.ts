export default function Logger(params?: string[]): void {
  if (params && params.length !== 0) {
    const text = params.reduce(
      (acc, curr, index) =>
        index == params.length - 1 ? acc + `${curr}]` : acc + `${curr}] - [`,
      '(Logger) ['
    );
    console.log(text);
  }
}
