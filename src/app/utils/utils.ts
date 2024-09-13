export function groupBy(array: any[], key: string) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}

export function formataDataISO(data: string): string {
  let dataString: string = new Date(data).toISOString().split('T')[0]
  const dataFormatada = dataString.split('-').join('/');
  return dataFormatada;
}
