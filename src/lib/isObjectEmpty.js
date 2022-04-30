import _ from 'lodash';

export default object => _.isEmpty(_.omitBy(object, _.isUndefined));