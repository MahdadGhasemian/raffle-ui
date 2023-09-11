// ** Import libraries
import momentjalaali from 'moment-jalaali'
import moment from 'moment-timezone'

export const fromNow = (date: Date) => {
  const inputTime = moment.utc(date)
  const currentTime = moment.utc()

  const diffInMinutes = currentTime.diff(inputTime, 'minutes')

  if (diffInMinutes < 60) {
    return `${diffInMinutes} دقیقه پیش`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} ساعت پیش`
  } else if (inputTime.isSame(currentTime, 'd')) {
    return `امروز - ${inputTime.format('HH:mm')}`
  } else if (inputTime.isSame(currentTime.clone().subtract(1, 'd'), 'd')) {
    return `دیروز - ${inputTime.format('HH:mm')}`
  } else {
    return momentjalaali(inputTime).format('jMM/jDD - HH:mm')
  }
}
