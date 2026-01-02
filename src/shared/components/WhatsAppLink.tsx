import { formatPhoneNumber } from '../utils/helpers'

const WhatsAppLink = ({ phone }: { phone: string }) => {
  const buildUrl = (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '')
    return `https://wa.me/${cleanedNumber}`
  }
  return (
    <a href={buildUrl(phone)} target="_blank" rel="noreferrer">
      {formatPhoneNumber(phone)}
    </a>
  )
}

export default WhatsAppLink
