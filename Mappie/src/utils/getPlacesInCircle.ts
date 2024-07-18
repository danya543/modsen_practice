import { coords } from '@/entities/location';
import { PlacesFilter } from '@/entities/PlacesFilter';

import getFilters from './getFilters';

const makePromiseArrayForFilters = (
  position: { lng: number; lat: number },
  radius: number,
  filters: PlacesFilter[],
  service: google.maps.places.PlacesService
): Promise<google.maps.places.PlaceResult[]>[] => {
  const filterTypes = getFilters(filters);
  return filterTypes.reduce(
    (promises: Promise<google.maps.places.PlaceResult[]>[], type) => [
      ...promises,
      new Promise<google.maps.places.PlaceResult[]>((resolve) => {
        let places: google.maps.places.PlaceResult[] = [];
        service.nearbySearch(
          {
            location: position,
            language: 'ru',
            radius: radius,
            type: type
          },
          (response, _status, pagination) => {
            if (response != null) {
              places = places.concat(response);
            }
            if (pagination?.hasNextPage) {
              pagination.nextPage();
            } else {
              resolve(places.filter((place) => place.business_status != undefined));
            }
          }
        );
      })
    ],
    []
  );
};

export const getPlacesInCircle = async (coord: coords, radius: number, filters: PlacesFilter[]) => {
  await google.maps.importLibrary('places');
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  return Promise.all(makePromiseArrayForFilters(coord, radius, filters, service)).then((places) => {
    new Promise<google.maps.places.PlaceResult[]>((resolve) => {
      if (places != null) {
        const idSet = new Set<string>();
        const allPlaces = places.reduce(
          (array: google.maps.places.PlaceResult[], places: google.maps.places.PlaceResult[]) => [
            ...array,
            ...places.filter((place) => {
              if (place.place_id !== undefined && !idSet.has(place.place_id)) {
                idSet.add(place.place_id);
                return true;
              } else {
                return false;
              }
            })
          ],
          []
        );
        resolve(allPlaces);
      }
    });
  });
};
