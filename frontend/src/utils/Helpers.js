export const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth()
  const formattedMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const year = date.getFullYear()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return `${year}/${formattedMonths[month]}/${day} - ${hours}:${minutes}`
}

export const generateId = () => (
  Math.random().toString(36).substr(-8)
)