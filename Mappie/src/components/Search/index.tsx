import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect } from "react";

export const Search = ({ isLoaded, onSearch }: { isLoaded: boolean, onSearch: ({ lat, lng }: { lat: number, lng: number }) => void }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: { target: { value: string; }; }) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: string }) =>
            () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    /* console.log("📍 Coordinates: ", { lat, lng }); */
                    onSearch({ lat, lng });
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" role="button" key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    useEffect(() => {
        if (isLoaded === true) {
            init();
        }
    }, [isLoaded, init])

    return (
        <div className="w-100 d-flex flex-column justify-content-center" ref={ref}>
            <input

                className=""
                placeholder="Место, адрес.."
                type="text"
                value={value}
                onChange={handleInput}
                disabled={!ready} />
            {status === "OK" && <ul className="list-unstyled">{renderSuggestions()}</ul>}
        </div>
    )
}