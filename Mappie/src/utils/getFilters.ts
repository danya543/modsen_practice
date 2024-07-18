import places from '@/constants/Places';
import { PlacesFilter } from '@/entities/PlacesFilter';

export default (filters: PlacesFilter[]): string[] => {
  return filters.reduce((types: string[], type) => {
    const placeTypes = places.get(type);
    return placeTypes !== undefined ? [...types, ...placeTypes] : [...types];
  }, []);
};
