export interface FavPlace {
    geometry: {
        lat: string | null | undefined;
        lng: string | null | undefined;
    };
    photos: {
        getUrl: (options: { maxWidth: number; maxHeight: number; }) => any;
    }[];
    place_id: string;
    name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
}