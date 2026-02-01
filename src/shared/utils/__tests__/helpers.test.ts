import {
  getUserInitials,
  getLabelFromCatalog,
  calculateAge,
  formatPhoneNumber,
} from '../helpers'

describe('getUserInitials', () => {
  it('returns two initials for a full name', () => {
    expect(getUserInitials('Juan Pérez')).toBe('JP')
  })

  it('returns single initial for a single name', () => {
    expect(getUserInitials('Juan')).toBe('J')
  })

  it('returns only first two initials for three or more names', () => {
    expect(getUserInitials('Juan Carlos Pérez')).toBe('JC')
  })

  it('handles lowercase names', () => {
    expect(getUserInitials('juan pérez')).toBe('JP')
  })

  it('returns empty string for empty input', () => {
    expect(getUserInitials('')).toBe('')
  })
})

describe('getLabelFromCatalog', () => {
  const catalog = [
    { value: 'dog', label: 'Perro' },
    { value: 'cat', label: 'Gato' },
    { value: 'bird', label: 'Ave' },
  ]

  it('returns the label when key exists', () => {
    expect(getLabelFromCatalog('dog', catalog)).toBe('Perro')
  })

  it('returns the key when not found in catalog', () => {
    expect(getLabelFromCatalog('fish', catalog)).toBe('fish')
  })

  it('returns the key for empty catalog', () => {
    expect(getLabelFromCatalog('dog', [])).toBe('dog')
  })
})

describe('calculateAge', () => {
  it('returns N/A for null date', () => {
    expect(calculateAge(null)).toBe('N/A')
  })

  it('returns years for age greater than 1 year', () => {
    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)
    expect(calculateAge(twoYearsAgo)).toBe('2 años')
  })

  it.todo('returns singular year for exactly 1 year', () => {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    expect(calculateAge(oneYearAgo)).toBe('1 año')
  })

  it('returns months for age less than 1 year', () => {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const result = calculateAge(sixMonthsAgo)
    expect(result).toMatch(/\d+ mes(es)?/)
  })

  it('returns singular month for 1 month', () => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const result = calculateAge(oneMonthAgo)
    expect(result).toMatch(/1 mes$/)
  })
})

describe('formatPhoneNumber', () => {
  it('formats 10-digit phone number correctly', () => {
    expect(formatPhoneNumber('5551234567')).toBe('555-123-4567')
  })

  it('returns original string for less than 10 digits', () => {
    expect(formatPhoneNumber('12345')).toBe('12345')
  })

  it.todo('formats phone number with more than 10 digits', () => {
    expect(formatPhoneNumber('15551234567')).toBe('155-512-3456')
  })

  it('returns empty string for empty input', () => {
    expect(formatPhoneNumber('')).toBe('')
  })
})
