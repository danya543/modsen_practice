import { Panel } from "../SidBarPanel/Panel"

export const SideBar = () => {
    return (
        <div className="w-25 d-flex">
            <div className="w-25">left part</div>
            <Panel />
        </div>
    )
}