export type SearchListItem = {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};
export interface ISearchList {
  data: SearchListItem[];
  handleSelect: ({ description }: { description: string }) => () => void;
}
