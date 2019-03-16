export default {
  Query: {
    getJobById: async (_, { id }, { dataSources }) => {
      return await dataSources.jobsAPI.getJobById(id);
    }
  },
  Job: {
    related: async (job, _, { dataSources }) => {
      return job.related.map( async ({ id }) => await dataSources.jobsAPI.getRelatedById(id));
    },
    skills: async (job, _, { dataSources }) => {
      return await dataSources.jobsAPI.getJobSkillById(job.id);
    }
  },
  RelatedJobs: {
    job: async ({ job }, _, { dataSources }) => {
      return await dataSources.jobsAPI.getJobById(job);
    }
  }
};
