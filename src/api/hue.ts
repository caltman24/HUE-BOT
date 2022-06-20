import { config } from "dotenv";
import axios, { AxiosResponse } from "axios";
config();
const { USER_ID, BRIDGE_IP } = process.env;

export type id = string | number;

interface FetchLightFunc {
  (): Promise<AxiosResponse>;
}

interface LightOptions {
  on: boolean;
  hue: number;
  sat?: number;
  bri?: number;
}

interface IDList {
  [key: id]: string;
}

interface Hues {
  [key: string]: number;
}

export const hues: Hues = {
  lightBlue: 39819,
  darkBlue: 47308,
  darkPurple: 48705,
  purple: 49298,
  pink: 52090,
  hotPink: 59487,
  red: 65314,
  bloodOrange: 3032,
  orange: 55910,
  yellow: 9454,
  yellowGreen: 13569,
  green: 20148,
  teal: 32068,
  cyan: 36963,
};

export const randomHue = (): number => Math.floor(Math.random() * 65535);

// Returns a promise that resolves to an object containing the light data
export const fetchLights: FetchLightFunc = async () => {
  const url = `http://${BRIDGE_IP}/api/${USER_ID}/lights`;
  try {
    return await axios.get(url);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getLightIds = async (fetchLights: FetchLightFunc) => {
  const { data } = await fetchLights();
  const lightIds = Object.keys(data);
  const idList: IDList = {};
  lightIds.forEach((id) => {
    Object.assign(idList, { [id]: data[id].name });
  });
  return idList;
};

export const getCurrentState = async (id: id) => {
  const url = `http://${BRIDGE_IP}/api/${USER_ID}/lights/${id}`;
  try {
    const { data } = await axios.get(url);
    return data.state;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCurrentHue = async (id: id) => {
  const { hue } = await getCurrentState(id);
  return hue as number;
};

export const getCurrentSaturation = async (id: id) => {
  const { sat } = await getCurrentState(id);
  return sat as number;
};

export const getCurrentBrightness = async (id: id) => {
  const { bri } = await getCurrentState(id);
  return bri as number;
};

// Control a light by light ID and the desired state
export const controlLight = async (
  light: id,
  { on, hue, sat = 254, bri = 254 }: LightOptions
) => {
  const url = `http://${BRIDGE_IP}/api/${USER_ID}/lights/${light}/state`;
  try {
    return await axios.put(url, {
      on,
      ...(hue && { hue }),
      ...(sat && { sat }),
      ...(bri && { bri }),
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

//TODO: add a function to control on state of a light
//TODO: add a function to control hue state of a light
//TODO: add a function to control sat state of a light
//TODO: add a function to control bri state of a light
