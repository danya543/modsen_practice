import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FormEvent } from 'react';

import { PlacesFilter } from '@/entities/PlacesFilter';
import { useAction } from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from '../style.module.css';

export const Features = () => {

    const filtersArray = useTypedSelector((state) => state.filter.filters);
    const filters = new Set(filtersArray);
    const { setFilters } = useAction();
    //const [isActive, setIsActive] = useState(false)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFilters(filters);
    };

    const addFilter = (filter: PlacesFilter) => {
        filters.add(filter);
    };

    const removeFilter = (filter: PlacesFilter) => {
        filters.delete(filter);
    };
    // @ts-ignore
    const onClick = (e) => {
        const el = e.target.parentNode;
        if (el.id != 'filter') {
            filters.has(e) ? removeFilter(e) : addFilter(e);
            //places.includes(el.id) ? places.splice(places.indexOf(el.id), 1) : places.push(el.id);
            //setIsActive((prev) => !prev)
            el.style.opacity = el.style.opacity == 1 ? 0.5 : 1;
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
                <Button type="submit" fullWidth sx={{ bgcolor: "#5E7BC7" }}>
                    <Search sx={{ color: "white", fontSize: 30 }} />
                </Button>
            </form>
        </div>
    );
};
