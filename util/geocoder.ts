export interface GeoResult {
  id: number;
  name: string;
  admin1: string;
  admin2: string;
  country: string;
}

const apiServices = {
  openMeteo: "https://geocoding-api.open-meteo.com/v1/search?name=",
  geoName: "https://api.geonames.org/search?type=json&username=geobirdle&q=",
  birdbase: "localhost:8000/",
};

function createURL(text: string, service: keyof typeof apiServices) {
  return apiServices[service] + text;
}
async function geocode(text: string): Promise<GeoResult[]> {
  try {
    const res = await (await fetch(createURL(text, "geoName"))).json();
    console.log(res.results);

    return res.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function parse({ admin1, admin2, country, name }: GeoResult) {
  return `${name} ${admin2} ${admin1} ${country}`;
}

export { geocode, parse };
