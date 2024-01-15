import { fetchAuthenticatedApi } from "../../utils/api";

class AnalystManager {
  constructor() {}
  async get(type) {
    return fetchAuthenticatedApi({
      method: "GET",
      url: `/analyst/${type}`,
    });
  }
}

export default new AnalystManager();
