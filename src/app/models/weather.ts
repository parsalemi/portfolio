export interface WeatherCity {
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: Days[];
  description: string;
  currentConditions: Current;
}
export interface Days{
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  snow: number;
  windspeed: number;
  sunrise: string;
  sunset: string;
  conditions: string;
  description: string;
  icon: string;
}
export interface Current {
  datetime: string;
  temp: number;
  snow: number;
  windspeed: number;
  conditions: string;
  sunrise: string;
  sunset: string;
  icon: string;
}
