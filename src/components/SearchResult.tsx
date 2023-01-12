import useMapStore from '@src/stores/MapStore';
import React from 'react';
import './SearchResult.scss';

export interface placeResult {
  $type: string;
  id: string;
  url: string;
  commonName: string;
  placeType: string;
  additionalProperties: Record<string, unknown>[];
  children: Record<string, unknown>[];
  childrenUrls: string[];
  lat: number;
  lon: number;
}

interface Props {
  results?: placeResult[];
  onSearchItemClicked: () => void;
}

const SearchResult: React.FC<Props> = ({ results, onSearchItemClicked }) => {
  const { setSelectedPlace } = useMapStore();
  return (
    <div className='bg-white position-absolute search-result border'>
      {results && results.length ? (
        <>
          {results.map((result) => (
            <div
              key={result.id}
              className='p-2 search-item'
              onClick={() => {
                onSearchItemClicked();
                setSelectedPlace(result);
              }}
            >
              <small>
                <b>{result.commonName}</b>
              </small>
            </div>
          ))}
        </>
      ) : (
        <div className='text-center'>
          <small>Searching...</small>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
