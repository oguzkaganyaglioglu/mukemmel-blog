import ReactGA from 'react-ga'
require("dotenv").config();

export const initGA = () => {
  console.log('GA init')
  ReactGA.initialize(process.env.GoogleTrackingID)
}
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}