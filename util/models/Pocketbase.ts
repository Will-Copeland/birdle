type YesNo = "yes" | "no";

export interface XenoCantoRecording {
  id: string;
  gen: string;
  sp: string;
  ssp: string;
  group: string;
  en: string;
  rec: "Jacobo Ramil MIllarengo";
  cnt: string;
  loc: string;
  lat: string;
  lng: string;
  alt: "30";
  type: "song";
  sex: string;
  stage: "adult";
  method: "field recording";
  url: "//xeno-canto.org/694038";
  file: "//xeno-canto.org/694038/download";
  "file-name": "XC694038-211223_02Carrizo variaci\u00f3ns dunha frase bastante stereotipada siteD 9.30 Sisalde.mp3";
  sono: {
    small: "//xeno-canto.org/sounds/uploaded/LHCOINSOBZ/ffts/XC694038-small.png";
    med: "//xeno-canto.org/sounds/uploaded/LHCOINSOBZ/ffts/XC694038-med.png";
    large: "//xeno-canto.org/sounds/uploaded/LHCOINSOBZ/ffts/XC694038-large.png";
    full: "//xeno-canto.org/sounds/uploaded/LHCOINSOBZ/ffts/XC694038-full.png";
  };
  osci: {
    small: "//xeno-canto.org/sounds/uploaded/LHCOINSOBZ/wave/XC694038-small.png";
    med: "//xeno-canto.org/sounds/uploaded/LHCOINSOBZ/wave/XC694038-med.png";
    large: "//xeno-canto.org/sounds/uploaded/LHCOINSOBZ/wave/XC694038-large.png";
  };
  lic: "//creativecommons.org/licenses/by-nc-sa/4.0/";
  q: string; // "A" | "B"
  length: string; // "4:08"
  time: string; // "09:30"
  date: string; // "2021-12-23"
  uploaded: string; // "2021-12-27"
  also: string[]; // ["Turdus viscivorus", "Turdus iliacus", "Parus major"]
  rmk: string;
  "bird-seen": YesNo;
  "animal-seen": YesNo;
  "playback-used": YesNo;
  temp: "";
  regnr: "";
  auto: "unknown";
  dvc: "";
  mic: "";
  smp: "44100";
}

export interface SearchState {
  loc?: string;
  sex?: string;
  gen?: string;
  sp?: string;
  ssp?: string;
  q?: "A" | "B";
}

export interface ResultsState extends SearchState {
  species?: string[];
  recordings: XenoCantoRecording[];
  genera?: string[]; // plural of "genus"
  subspecies?: string[];
}
