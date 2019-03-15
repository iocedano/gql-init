
export default {
  Query: {
    getJobById: async (_, { id }, { dataSources }) => {
      console.log(dataSources);
      return await dataSources.jobsAPI.getJobById(id);
    }
  },
  Job: {
    related: async (job, _,{ dataSources }) => {
      return job.related.map( async ({ id }) => await dataSources.relatedAPI.getRelatedById(id));
    }
  },
  RelatedJobs: {
    job: async ({ job }, _, { dataSources }) => {
      return await dataSources.jobsAPI.getJobById(job);
    }
  }
};
