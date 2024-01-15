import { fetchAuthenticatedApi } from "../../utils/api";
import { prepareAddress } from "../../utils/prepareBody";

const DOCTOR_BASEURL = "/doctor";

class DoctorManager {
  async getAll() {
    return fetchAuthenticatedApi({
      url: DOCTOR_BASEURL,
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
      url: DOCTOR_BASEURL,
      data: body,
      method: "POST",
    });
  }
  async search(searchText) {
    return fetchAuthenticatedApi({
      url: DOCTOR_BASEURL + "/search",
      method: "GET",
      params: {
        searchText,
      },
    });
  }
  async edit(data) {
    return fetchAuthenticatedApi({
      url: DOCTOR_BASEURL + `/${data.id_bac_si}`,
      method: "PUT",
      data,
    });
  }
  async delete(id) {
    return fetchAuthenticatedApi({
      url: DOCTOR_BASEURL + `/${id}`,
      method: "DELETE",
    });
  }
}

export default new DoctorManager();
