import { Search } from "../Search"

export const Panel = ({
    isLoaded, onSearch
}: {
    isLoaded: boolean,
    onSearch: ({ lat, lng }: { lat: number, lng: number }, zoom: number) => void
}) => {
    return (
        <div className="w-75">
            <Search isLoaded={isLoaded} onSearch={onSearch} />
            fav panel
        </div>
    )
}