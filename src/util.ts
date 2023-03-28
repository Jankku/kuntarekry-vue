export function debounce(fn: (args: any) => any, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    // @ts-ignore
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
