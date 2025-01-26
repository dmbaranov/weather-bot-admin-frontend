export function sortMonthYearKeys(data: Record<string, unknown>) {
  return Object.keys(data).sort((a, b) => {
    const [aMonth, aYear] = a.split('/');
    const [bMonth, bYear] = b.split('/');

    if (aYear === bYear) {
      return Number(aMonth) - Number(bMonth);
    }

    return Number(aYear) - Number(bYear);
  });
}

export function getGroupedData<T extends Record<string, unknown>>(data: T[], key: keyof T) {
  return data.reduce((acc: Record<string, number>, item: T) => {
    const fullKey = item[key] as string;
    acc[fullKey] ??= 1;
    acc[fullKey] += 1;

    return acc;
  }, {});
}
