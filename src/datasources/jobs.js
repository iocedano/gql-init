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

  async getJobSkillById(id) {
    const { skills } = await this.get(`jobs/${id}/related_skills`);

    return skills.map(this.skillJobMap);
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

  relatedJobMap({ uuid, title }) {
    return {
      id: uuid,
      title
    }
  }

  skillJobMap(skill) {
    const {
      skill_uuid,
      skill_name,
      skill_type,
      description,
      normalized_skill_name,
      importance,
      level
    } = skill;

    return {
      id: skill_uuid,
      name: skill_name,
      type: skill_type,
      description,
      normalizedName: normalized_skill_name,
      importance,
      level
    };
  }
}

export default Jobs;
