import { CollectionCities, City, DateHandlerType, CollectionCitiesWithDistance, CollectionCitiesName, CityName, ItemsComparitionType } from '../types'

export const setValue = (query : CityName) => {
    if (!query) {
        return []
    } else {
        return query
    }
}

export const distanceCalculator = (lat1 :number, lon1 :number, lat2 :number, lon2 :number) => {
    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI / 180;
    const dLon = (lon2-lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    if (d>1) return Math.round(d);
    else if (d<=1) return Math.round(d*1000);
    return d;
}

export const distanceMaker = (list: City[]) => {
    let counter = 0
    const cityList: CollectionCitiesWithDistance = []
    list.forEach((x: City, i) => {        
        if(i !== list.length - 1) {
            cityList.push({ 
                origin: x[0], 
                destination: list[i + 1][0], 
                distance: distanceCalculator(x[1], x[2], list[i+1][1], list[i+1][2]) 
            })
            return counter++
        }
    })
    return { cityList, completeDistance: cityList.reduce((acc, x) => acc + x.distance, 0) }
}

export const itemsComparition = (a: CityName, b: CityName) => a.name === b.name;


export const arrayFiltered = (a: CityName[], b: CityName[], compareFunction: ItemsComparitionType) => 
a.filter(aValue =>
    !b.some(bValue => 
        compareFunction(aValue, bValue)));
        
export const dateHandler: DateHandlerType = (date) => {
    if(date !== undefined) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
    }
    return ''
};

export const citiesListComplete: CollectionCities = [
    ['Paris', 48.856614, 2.352222],
    ['Marseille', 43.296482, 5.369780],
    ['Lyon', 45.764043, 4.835659],
    ['Toulouse', 43.604652, 1.444209],
    ['Nice', 43.710173, 7.261953],
    ['Nantes', 47.218371, -1.553621],
    ['Strasbourg', 48.573405, 7.752111],
    ['Montpellier', 43.610769, 3.876716],
    ['Bordeaux', 44.837789, -0.579180],
    ['Lille', 50.629250, 3.057256],
    ['Rennes', 48.117266, -1.677793],
    ['Reims', 49.258329, 4.031696],
    ['Le Havre', 49.494370, 0.107929],
    ['Saint-Étienne', 45.439695, 4.387178],
    ['Toulon', 43.124228, 5.928000],
    ['Angers', 47.478419, -0.563166],
    ['Grenoble', 45.188529, 5.724524],
    ['Dijon', 47.322047, 5.041480],
    ['Nîmes', 43.836699, 4.360054],
    ['Aix-en-Provence', 43.529742, 5.447427],
]

export const citiesNames: CollectionCitiesName = [
    {name: 'Paris'},
    {name: 'Marseille'},
    {name: 'Lyon'},
    {name: 'Toulouse'},
    {name: 'Nice'},
    {name: 'Nantes'},
    {name: 'Strasbourg'},
    {name: 'Montpellier'},
    {name: 'Bordeaux'},
    {name: 'Lille'},
    {name: 'Rennes'},
    {name: 'Reims'},
    {name: 'Le Havre'},
    {name: 'Saint-Étienne'},
    {name: 'Toulon'},
    {name: 'Angers'},
    {name: 'Grenoble'},
    {name: 'Dijon'},
    {name: 'Nîmes'},
    {name: 'Aix-en-Provence'},
]

export const months: string[] = ['Jan', 'Febr', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Octr', 'Nov', 'Dec'];