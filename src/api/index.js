import qs from "qs";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://itunes.apple.com",
});

export const getMusics = (term) => {
  const params = {
    term,
    media: "music",
    entity: "musicTrack",
    country: "jp",
    lang: "ja_jp",
    limit: "50",
  };
  return apiClient.get(`/search?${qs.stringify(params)}`);
};
