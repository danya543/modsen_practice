import places from '@/constants/Places';
import { PlacesFilter } from '@/entities/PlacesFilter';
export default (filters: PlacesFilter[]): string[] => {
  return filters.reduce((types: string[], type) => {
    // @ts-ignore
    const placeTypes = places.get(PlacesFilter[type.target.innerText]);
    console.log(placeTypes)
    return placeTypes !== undefined
      ? [...types, ...placeTypes]
      : [...types];
  }, []);
};

