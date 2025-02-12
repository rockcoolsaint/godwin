import { format, parseISO, isBefore } from 'date-fns'

export function formatDate(timeStamp: string, dateFormat = 'do MMMM, yyyy h:mmaa') {
  return format(parseISO(timeStamp), dateFormat)
}

export const isDateBefore = (date: string) => {
  return isBefore(parseISO(date), new Date())
}

export function convertTime(timeString: string) {
  const parts = timeString.split(':')
  const days = parseInt(parts[0], 10)
  const hours = parseInt(parts[1], 10)
  const minutes = parseInt(parts[2], 10)

  const totalMinutes = hours * 60 + minutes
  const totalHours = totalMinutes / 60
  const totalDays = days

  return {
    days: Math.floor(totalDays),
    hours: Math.floor(totalHours % 24),
    minutes: Math.floor(totalMinutes % 60),
  }
}

export const formatAuctionDuration = (days: number): string => {
  const hoursTotal = days * 24;
  
  if (days < 1) {
    return `${Math.round(hoursTotal)} hours`;
  }
  
  return `${days} ${days > 1 ? 'days' : 'day'}`;
};