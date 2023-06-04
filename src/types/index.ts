export interface OptionRecords {
    value: string
    label: string
    id: string
}

export interface CityName {
    name: string
}

export interface CityParamState {
    key?: string
    name: string
    error: boolean
    errorMsg: string
}

export type City = [string, number, number]


export type CollectionCities = Array<City>

export type CollectionCitiesName = Array<CityName>

export type CityWithDistance = {
    origin: string
    destination: string
    distance: number
}

export type CollectionCitiesWithDistance = Array<CityWithDistance>

export type ItemsComparitionType = (a: CityName, b: CityName) => boolean
