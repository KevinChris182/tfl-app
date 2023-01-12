import { StopPoint } from '@src/components/Map';
import { placeResult } from '@src/components/SearchResult';
import { create } from 'zustand';

interface MapState {
  selectedPlace: placeResult | null;
  selectedStopPoint: StopPoint | null;
  stopPointList: StopPoint[];
  setSelectedPlace: (place: placeResult) => void;
  setSelectedStopPoint: (stopPoint: StopPoint) => void;
  setStopPointList: (list: StopPoint[]) => void;
}

const useMapStore = create<MapState>()((set) => ({
  selectedPlace: null,
  selectedStopPoint: null,
  stopPointList: [],
  setSelectedStopPoint: (stopPoint) =>
    set(() => ({ selectedStopPoint: stopPoint })),
  setSelectedPlace: (place) => set(() => ({ selectedPlace: place })),
  setStopPointList: (list) => set(() => ({ stopPointList: list })),
}));

export default useMapStore;
