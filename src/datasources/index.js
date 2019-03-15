import JobAPI from './jobs';
import RelatedAPI from './related';

const BASE_URL = 'http://api.dataatwork.org/v1/';

export default {
  jobsAPI: new JobAPI(BASE_URL),
  relatedAPI: new RelatedAPI(BASE_URL),
}
