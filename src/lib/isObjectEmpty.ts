import _ from 'lodash';

export default (object?: Object): boolean => _.isEmpty(_.omitBy(object, _.isUndefined));