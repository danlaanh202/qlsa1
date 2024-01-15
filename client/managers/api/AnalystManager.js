import { fetchAuthenticatedApi } from "../../utils/api";

class AnalystManager {
  constructor() {}
  async get(type, ignoreCache = false) {
    return fetchAuthenticatedApi({
      method: "GET",
      url: `/analyst/${type}?ignoreCache=${ignoreCache}`,
    });
  }
}

export default new AnalystManager();
