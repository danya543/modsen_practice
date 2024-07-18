export type coords = {
  lat: number;
  lng: number;
};

export type sidebarProps = {
  isLoaded: boolean;
  onSearch: ({ lat, lng }: coords, zoom: number) => void;
  radius: number;
  onChangeRadius: (e: { target: { value: string } }) => void;
};
export type searchProps = Omit<sidebarProps, 'onChangeRadius' | 'radius'>;
