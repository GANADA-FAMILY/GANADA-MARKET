import payAPI from 'api/payAPI';
import Complete from './Complete';
import Ready from './Ready';

type payAPI = Complete | Ready;

export default payAPI;
export type { Complete, Ready };
