import { SideBar } from "../features/SideBar/SideBar";
import { Map } from "../features/Map/Map";

export const MainPage = () => {
    return (
        <div className="w-100 h-100 d-flex flex-md-row">
            <SideBar />
            <Map />
        </div>
    )
}
{/*  */ }