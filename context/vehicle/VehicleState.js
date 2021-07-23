import React, { useReducer } from "react";
import VehicleContext from "./vehicleContext";
import VehicleReducer from "./vehicleReducer";
import api from "../../api/api";
import {
  GET_VEHICLES_ADVANCED_SEARCH,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
} from "../types";

const VehicleState = (props) => {
  const initialState = {
    vehicles: null,
    loading: false,
    error: null,
    results: null,
  };

  const [state, dispatch] = useReducer(VehicleReducer, initialState);

  //Get Vehicles
  const getVehicles = async (page, query) => {
    setLoading();
    try {
      const res = await api.get(
        `/vehicles/advancedResults?page=${page}&limit=12&searchText=${query}`
      );
      dispatch({ type: GET_VEHICLES_ADVANCED_SEARCH, payload: res.data });
    } catch (err) {

      dispatch({ type: SET_ERROR, payload: err})


    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <VehicleContext.Provider
      value={{
        loading: state.loading,
        vehicles: state.vehicles,
        error: state.error,
        results: state.results,
        getVehicles,
        clearState,
        setLoading,
      }}
    >
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleState;
