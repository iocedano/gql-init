const { RESTDataSource } = require('apollo-datasource-rest');

class Jobs extends RESTDataSource {
  constructor(baseURL) {
    super();
    this.baseURL = baseURL;
  }

  async getJobById(id) {
    const { uuid, title, onet_soc_code, description, related_job_titles } = await this.get(`jobs/${id}`);

    return {
      id: uuid,
      title,
      onetSocCode: onet_soc_code,
      description,
      related: related_job_titles.map(this.relatedJobMap)
    };
  }

  async getRelatedJobs(relatedJobs) {
    const meta = await this.get(`jobs/${id}`);
    const job = await this.get(`jobs/${id}`);

    return {
      id: uuid,
      title,
      onetSocCode: onet_soc_code,
      description,
      related: related_job_titles.map(this.relatedJobMap)
    };
  }

  relatedJobMap({ uuid, title }) {
    return {
      id: uuid,
      title
    }
  }
}

export default Jobs;
