import { createContext, useState } from "react";
import {
  getAboutUs,
  getHomeSubtitle,
  getSiteOffering,
} from "../services/homeServices";

const HomeContext = createContext();

function HomeProvider({ children }) {
  const [aboutUs, setAboutUs] = useState(null);
  const [homeSubtitle, setHomeSubtitle] = useState(null);
  const [siteOffering, setSiteOffering] = useState(null);

  async function getAboutUsHandler() {
    try {
      const response = await getAboutUs();
      setAboutUs(response.data);
    } catch (error) {
      console.log("*** getAboutUsHandler error: ", error);
      throw error;
    }
  }

  async function getHomeSubtitleHandler() {
    try {
      const response = await getHomeSubtitle();
      setHomeSubtitle(response.data);
    } catch (error) {
      console.log("*** getHomeSubtitleHandler error: ", error);
      throw error;
    }
  }

  async function getSiteOfferingHandler() {
    try {
      const response = await getSiteOffering();
      setSiteOffering(response.data);
    } catch (error) {
      console.log("*** getSiteOfferingHandler error: ", error);
      throw error;
    }
  }

  return (
    <HomeContext.Provider
      value={{
        getAboutUsHandler,
        getHomeSubtitleHandler,
        getSiteOfferingHandler,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext };
export default HomeProvider;