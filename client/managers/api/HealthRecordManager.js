import { fetchAuthenticatedApi } from "../../utils/api";

const HEALTH_RECORD_BASEURL = "/health_record";

class HealthRecordManager {
  async create(data) {
    return fetchAuthenticatedApi({
      url: HEALTH_RECORD_BASEURL,
      data,
      method: "POST",
    });
  }
  async get(searchText, type = "patient") {
    return fetchAuthenticatedApi({
      url: HEALTH_RECORD_BASEURL,
      method: "GET",
      params: {
        searchText,
        type,
      },
    });
  }
  async getByPK(id) {
    return fetchAuthenticatedApi({
      url: `${HEALTH_RECORD_BASEURL}/${id}`,
      method: "GET",
    });
  }
}

export default new HealthRecordManager();
