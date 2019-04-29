/* eslint-disable prettier/prettier */
export default {
  Query: {
    getJobById: async (_, { id }, { dataSources }) => {
      return dataSources.jobsAPI.getJobById(id);
    },
    getAll() {
      return [
        {
          skills: [{}],
          title: 'Job'
        }, {
          type: 'ss',
          name: 'Skill'
        }
      ];
    }
  },
  All: {
    __resolveType(obj) {
      if (obj.skills) {
        return 'Job';
      }

      if (obj.type) {
        return 'Skill';
      }

      return 'Job';
    }
  },
  Job: {
    related: async (job, _, { dataSources }) => {
      return job.related.map(
        async ({ id }) => dataSources.jobsAPI.getRelatedById(id)
      );
    },
    skills: async (job, _, { dataSources }) => {
      return dataSources.jobsAPI.getJobSkillById(job.id);
    }
  },
  RelatedJobs: {
    job: async ({ job }, _, { dataSources }) => {
      return dataSources.jobsAPI.getJobById(job);
    }
  }
};
