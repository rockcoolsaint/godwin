import { format, parseISO, isBefore } from 'date-fns'

export function formatDate(timeStamp: string, dateFormat = 'do MMMM, yyyy hh:mmaaa') {
  return format(parseISO(timeStamp), dateFormat)
}

export const isDateBefore = (date: string) => {
  return isBefore(parseISO(date), new Date())
}
