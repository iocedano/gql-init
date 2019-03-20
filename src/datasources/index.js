import JobAPI from './jobs';

const BASE_URL = 'http://api.dataatwork.org/v1/';

export default {
  jobsAPI: new JobAPI(BASE_URL)
}
