import axios from "axios";

import { ICar } from "../model/car";
import { API_URLS } from "../constants";

export async function getCars(): Promise<ICar[]> {
  return axios(API_URLS.CARS)
    .then(res => res.data)
    .catch(console.error)
}