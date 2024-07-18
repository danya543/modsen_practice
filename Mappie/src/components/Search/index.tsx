import { useEffect } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import { Status } from '@/constants/Status';
import { searchProps } from '@/entities/location';
import { Input } from '@/ui/Input';

import { SearchList } from '../SearchList';

export const Search = ({ isLoaded, onSearch }: searchProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  useEffect(() => {
    if (isLoaded === true) {
      init();
    }
  }, [isLoaded, init]);

  const handleInput = (e: { target: { value: string } }) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
      () => {
        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          /* console.log("📍 Coordinates: ", { lat, lng }); */
          onSearch({ lat, lng }, 13);
        });
      };

  /* const renderSuggestions = () =>
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
        }); */

  return (
    <div className="w-100 d-flex flex-column justify-content-center position-relative" ref={ref}>
      <Input
        placeholder={'Место, адрес..'}
        type={'text'}
        value={value}
        onChange={handleInput}
        isActive={!ready}
      />
      {status === Status.nothing
        ? 'Ничего не найдено'
        : status === Status.success && <SearchList data={data} handleSelect={handleSelect} />}
    </div>
  );
};
