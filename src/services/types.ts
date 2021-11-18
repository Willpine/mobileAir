export interface PositionProps {
  latitude: number
  longitude: number
}

export interface CityProps extends PositionProps {
  id: number
  name: string
  weatherCode: string
  weatherTitle: string
}

export interface CountryCovidProps {
  confirmed: number
  recovered: number
  critical: number
  deaths: number
}
