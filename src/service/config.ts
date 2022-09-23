import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("accessToken");
const accessToken = "Bearer " + token;

export const local = window.location.href.includes("localhost:");

// const pindiasDomain = local ? "http://localhost:8888" : "https://v2.pindias.com";
const pindiasDomain = "https://v2.pindias.com";
const authorizationDomain = "https://accounts.metawayholdings.com";

// API for user roles
const userRolesAllRealEstateApi = "/api/v2/real-estate/me";

export {
    pindiasDomain,
    accessToken,
    userRolesAllRealEstateApi,
    authorizationDomain,
};
