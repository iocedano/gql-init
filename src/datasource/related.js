const { RESTDataSource } = require('apollo-datasource-rest');

class Related extends RESTDataSource {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
  }

  async getRelatedById(id) {
    const { uuid, title, normalized_job_title, parent_uuid } = await this.get(`jobs/${id}`);

    return {
      id: uuid,
      title,
      normalizedJobTitle: normalized_job_title,
      job: parent_uuid
    };
  }
}

export default Related;
