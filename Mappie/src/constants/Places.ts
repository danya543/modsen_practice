import { PlacesFilter } from '@/entities/PlacesFilter';

export default new Map<PlacesFilter, Set<string>>([
  [PlacesFilter.Establishment, new Set(['city_hall', 'tourist_attraction'])],
  [PlacesFilter.Bank, new Set(['atm', 'bank'])],
  [PlacesFilter.Bike, new Set(['bicycle_store'])],
  [PlacesFilter.Car, new Set(['car_dealer', 'car_rental', 'car_repair', 'car_wash'])],
  [PlacesFilter.Cafe, new Set(['cafe'])],
  [PlacesFilter.Culture, new Set(['art_gallery', 'museum', 'painter', 'tourist_attraction'])],
  [
    PlacesFilter.Entertainment,
    new Set(['aquarium', 'bowling_alley', 'casino', 'movie_rental', 'movie_theater', 'night_club'])
  ],
  [PlacesFilter.Food, new Set(['bakery', 'bar', 'meal_delivery', 'meal_takeaway', 'restaurant'])],
  [PlacesFilter.GasStation, new Set(['gas_station'])],
  [PlacesFilter.History, new Set(['cemetery', 'funeral_home'])],
  [PlacesFilter.Industrial, new Set(['storage'])],
  [PlacesFilter.ForAdult, new Set([''])],
  [PlacesFilter.Nature, new Set(['park', 'zoo'])],
  [PlacesFilter.Church, new Set(['church', 'hindu_temple', 'mosque', 'synagogue'])],
  [
    PlacesFilter.Shop,
    new Set([
      'book_store',
      'clothing_store',
      'convenience_store',
      'department_store',
      'drugstore',
      'electronics_store',
      'florist',
      'furniture_store',
      'hardware_store',
      'home_goods_store',
      'jewelry_store',
      'liquor_store',
      'pet_store',
      'shoe_store',
      'shopping_mall',
      'store',
      'supermarket'
    ])
  ],
  [PlacesFilter.Hotels, new Set(['lodging'])],
  [PlacesFilter.Sport, new Set(['campground', 'gym', 'stadium'])]
]);
