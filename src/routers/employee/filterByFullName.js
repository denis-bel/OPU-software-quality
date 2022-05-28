import middlewareWrapper from '@lib/middlewareWrapper';
import Employee from '@classes/dbModels/Employee';

async function filterByFullName(req, res) {
	const { fullName } = req.query;
	const employees = await Employee.findWithBrigadeNameByFullName(fullName);
	res.send({ employees });
}

export default [middlewareWrapper(filterByFullName)];