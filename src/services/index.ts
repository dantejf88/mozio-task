import { distanceMaker, citiesNames, arrayFiltered, itemsComparition} from '../utils'
import { City } from '../types'

// export const getCities = function (value: string) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(() => {
//             if(value.toLowerCase() !== 'fail'){
//                 if (value) resolve(citiesNames.filter((x) => x.name.toLowerCase().includes(value.toLowerCase())));
//                 return resolve(citiesNames)
//             } else {
//                 return reject(Error("Fail"));
//             } 
//         }, 1000)
//     });
// };

export const getCities = function (value: string, paramsList: {key: string, name: string}[] | []): Promise<any>  {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if(value.toLowerCase() !== 'fail'){
                const cityNameFiltered = arrayFiltered(citiesNames, paramsList, itemsComparition)
                if (value) resolve(cityNameFiltered.filter((x) => x.name.toLowerCase().includes(value.toLowerCase())));
                return resolve(cityNameFiltered)
            } 
            return reject({ status: 500, errorMsg: 'Oops! Failed to search with this keyword.' });
        }, 1000)
    });
};

export const getDistances = function (cities: City[]) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const validation = cities.filter((x) => x[0] === 'Dijon')
            if (validation.length === 0) resolve(distanceMaker(cities));
            return reject(Error("It broke"));
        }, 1000)
    });
};


