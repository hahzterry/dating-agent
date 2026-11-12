
import { Heart } from 'lucide-react'

const KOFI_URL = 'https://ko-fi.com/zodiacdatn'

export default function KoFiTip({
  label = 'Support Zodiac DatN',
  prominent = false,
}) {
  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={prominent ? 'btn primary' : 'link'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        textDecoration: 'none',
      }}
    >
      <Heart size={16} aria-hidden="true" />
      {label}
    </a>
  )
}
