import ReactGA from 'react-ga'
require("dotenv").config();

export const initGA = () => {
  //console.log("GA has been started");
  ReactGA.initialize(process.env.GOOGLE_TRACKING_ID)
}
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}