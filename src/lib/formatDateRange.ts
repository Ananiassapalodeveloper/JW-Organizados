import { format, Locale, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type FormatOptions = {
  showMonthAsText?: boolean
  locale?: Locale
}

export function formatDateRange(
  fromStr: string,
  toStr: string,
  options?: FormatOptions
): string {
  const locale = options?.locale || ptBR
  const showMonthAsText = options?.showMonthAsText ?? false

  const from = parse(fromStr, 'dd/MM/yyyy', new Date())
  const to = parse(toStr, 'dd/MM/yyyy', new Date())

  const sameMonth = format(from, 'MM/yyyy') === format(to, 'MM/yyyy')

  if (sameMonth) {
    const month = showMonthAsText
      ? format(from, 'MMMM', { locale })
      : format(from, 'MM')

    return `${format(from, 'dd')}-${format(to, 'dd')}/${month}/${format(from, 'yyyy')}`
  }

  return `${format(from, `dd/MMMM/yyyy`, { locale })} - ${format(to, `dd/MMMM/yyyy`, { locale })}`
}

export function formatDateRangeLong(
  fromStr: string,
  toStr: string,
  options?: FormatOptions
): string {
  const locale = options?.locale || ptBR
  const showMonthAsText = options?.showMonthAsText ?? false

  const from = parse(fromStr, 'dd/MM/yyyy', new Date())
  const to = parse(toStr, 'dd/MM/yyyy', new Date())

  const sameMonth = format(from, 'MM/yyyy') === format(to, 'MM/yyyy')

  if (sameMonth) {
    const month = showMonthAsText
      ? format(from, 'MMMM', { locale })
      : format(from, 'MM')

    return `${format(from, 'dd')} A ${format(to, 'dd')} de ${month} ${format(from, 'yyyy')}`
  }

  return `${format(from, `dd/MMMM/yyyy`, { locale })} - ${format(to, `dd/MMMM/yyyy`, { locale })}`
}

export function formatDateRangeSimple(
  fromStr: string,
  toStr: string,
  options?: FormatOptions
): string {
  const locale = options?.locale || ptBR

  const from = parse(fromStr, 'dd/MM/yyyy', new Date())
  const to = parse(toStr, 'dd/MM/yyyy', new Date())

  const sameMonth = format(from, 'MM/yyyy') === format(to, 'MM/yyyy')

  if (sameMonth) {

    return `${format(from, 'dd')}-${format(to, 'dd')}`
  }

  return `${format(from, `dd/MMMM/yyyy`, { locale })} - ${format(to, `dd/MMMM/yyyy`, { locale })}`
}
