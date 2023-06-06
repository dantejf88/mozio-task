import { distanceMaker, citiesNames, arrayFiltered, itemsComparition, } from '../utils'
import { City, CityName } from '../types'

export const getCities = function (value: string, citiesList: CityName[] | []): Promise<any>  {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if(!value.toLowerCase().includes('fail')){
                const cityNameFiltered = arrayFiltered(citiesNames, citiesList, itemsComparition)
                if (value) resolve(cityNameFiltered.filter((x) => x.name.toLowerCase().includes(value.toLowerCase())));
                return resolve(cityNameFiltered)
            } 
            return reject({ status: 500, errorMsg: 'Oops! Failed to search with this keyword.' });
        }, 1000)
    });
};

export const getDistances = function (cities: City[]): Promise<any> {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const validation = cities.filter((x) => x[0] === 'Dijon')
            if (validation.length === 0) resolve(distanceMaker(cities));
            return reject({status: 500, errorMsg: 'Oops! Something went wrong!'});
        }, 1000)
    });
};


