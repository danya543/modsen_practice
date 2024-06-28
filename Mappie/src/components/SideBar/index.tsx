import { Panel } from "../SidBarPanel"


export const SideBar = ({ isLoaded, onSearch }: { isLoaded: boolean, onSearch: ({ lat, lng }: { lat: number, lng: number }) => void }) => {
    return (
        <div className="w-25 d-flex">
            <div className="w-25">left part</div>
            <Panel isLoaded={isLoaded} onSearch={onSearch} />
        </div>
    )
}