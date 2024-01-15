import { fetchAuthenticatedApi } from "../../utils/api";
import { prepareAddress } from "../../utils/prepareBody";

const PATIENT_BASEURL = "/patient";

class PatientManager {
  async getAll() {
    return fetchAuthenticatedApi({
      url: PATIENT_BASEURL,
      method: "GET",
    });
  }
  async create(data) {
    const { ward, district, province, ...restData } = data;
    const body = {
      ...restData,
      dia_chi: prepareAddress(ward, district, province),
    };
    return fetchAuthenticatedApi({
      url: PATIENT_BASEURL,
      data: body,
      method: "POST",
    });
  }
  async search(searchText) {
    return fetchAuthenticatedApi({
      url: PATIENT_BASEURL + "/search",
      method: "GET",
      params: {
        searchText,
      },
    });
  }
}

export default new PatientManager();
