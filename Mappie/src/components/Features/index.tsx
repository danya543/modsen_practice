import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FormEvent, useState } from 'react';
import { useDispatch } from "react-redux";

import { PlacesFilter } from '@/entities/PlacesFilter';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { clearFilter, setFilter } from "@/store/reducers/filterSlice";

import { Radius } from "../Radius";
import styles from '../style.module.css';

export const Features = ({ radius, onChangeRadius }: { radius: number, onChangeRadius: (e: { target: { value: string } }) => void }) => {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState(useTypedSelector((state) => state.filter.filters));

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(setFilter({ filters, radius }));
    };

    const addFilter = (filter: string) => {
        setFilters(filter);
    };

    const removeFilter = () => {
        /* if (filter === filters[0]) setFilters(filters.filter((el: string) => el != filter)); */
        setFilters(null);

        dispatch(clearFilter({ radius }))
    };

    //@ts-ignore
    const onClick = (e) => {
        const el = e.target.parentNode;
        if (el.id != 'filter') {
            /* filters.includes(e.target.innerText.toLowerCase()) ? removeFilter(e.target.innerText.toLowerCase()) : addFilter(e.target.innerText.toLowerCase()); */
            filters === (e.target.innerText.toLowerCase()) ? removeFilter() : addFilter(e.target.innerText.toLowerCase());
            //places.includes(el.id) ? places.splice(places.indexOf(el.id), 1) : places.push(el.id);
            //setIsActive((prev) => !prev)
            el.style.opacity = el.style.opacity == '1' ? '0.5' : '1';
        }
    };
    return (
        <div className={styles.featuresContainer}>
            <h6>Искать:</h6>
            <form onSubmit={onSubmit} className={styles.features}>
                <ul id="filter">
                    {Object.values(PlacesFilter).map((item: string | PlacesFilter, id: number) => {
                        return typeof item !== "string" &&
                            <li key={id} onClick={onClick}>
                                <img src={`src/assets/places/${PlacesFilter[item].toLowerCase()}.svg`} alt="" />
                                <span>{PlacesFilter[item]}</span>
                            </li>
                    })}
                </ul>
                <Radius radius={radius} onChange={onChangeRadius} />
                <Button type="submit" fullWidth sx={{ bgcolor: "#5E7BC7" }}>
                    <Search sx={{ color: "white", fontSize: 30 }} />
                </Button>
            </form>
        </div>
    );
};
