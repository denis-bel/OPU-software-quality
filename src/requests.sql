-- 1
-- Список імен робітників бригади номера Х
SELECT "fullName"
FROM brigades INNER JOIN employees ON brigades.id = employees."brigadeId"
WHERE "number" = 1

-- Сумма сплат робітника з ПІБ Х
SELECT sum FROM employee_payments
INNER JOIN employees ON "employeeId"=employees.id
WHERE "fullName"='Joshua K. Gunn'

-- 2
-- Список працівників ПІБ яких починається з літери 'J'
SELECT * FROM employees
WHERE "fullName" LIKE 'J%'

-- Список бригад назва яких починається з літери 'B'
SELECT * FROM brigades
WHERE "name" LIKE 'B%'

-- 3
-- Список діяльностей які почалися у заданий період
SELECT * FROM activities
WHERE "startDate" BETWEEN '2022-04-01' AND '2022-05-01'

-- Список платежів працівників сума яких, лежить у заданому діапазоні
SELECT * FROM employee_payments
WHERE sum BETWEEN 11000 AND 15000

-- 4
-- Скільки платежів виплачено робітнику з заданим ПІБ
SELECT count(*) FROM employee_payments
INNER JOIN employees ON "employeeId" = employees.id
WHERE "fullName" = 'Joshua K. Gunn'

-- Скільки робітників належить бригаді з заданим номером
SELECT count(*) FROM employees
INNER JOIN brigades ON "brigadeId" = brigades .id
WHERE number = 1

-- 5
-- Середня сума сплат робітників
SELECT "fullName", avg(sum)  FROM employees
JOIN employee_payments ON employee_payments."employeeId" = employees.id
GROUP BY "fullName"

-- Скільки робітників працюють у кожній бригаді?
SELECT name, count(*) FROM brigades
JOIN employees
ON employees."brigadeId" = brigades.id
GROUP BY name;

-- 6
-- Яка бригада має найбільше діяльностей?
SELECT name
FROM brigades
INNER JOIN activities ON activities."brigadeId" = brigades.id
GROUP BY brigades.id
HAVING count(*) >= ALL(SELECT count(*) FROM activities GROUP BY "brigadeId")

-- Хто з робітників має найбільше виплат?
SELECT "fullName" FROM employees
INNER JOIN employee_payments ON employee_payments."employeeId" = employees.id
GROUP BY employees.id
HAVING count(*) >= ALL (SELECT count(*) FROM employee_payments GROUP BY "employeeId")

-- 7
-- Для кожної бригади виначити робітника з максимальною сплатою
SELECT
	name,
	"fullName",
	sum
FROM
	brigades AS A
INNER JOIN employees ON
	employees."brigadeId" = A.id
INNER JOIN employee_payments ON
	employee_payments."employeeId" = employees.id
GROUP BY
	A.id,
	employees.id,
	sum
HAVING
	sum >= (
	SELECT
		max(sum)
	FROM
		employees
	INNER JOIN brigades ON
		brigades.id = "brigadeId"
	INNER JOIN employee_payments ON
		employee_payments."employeeId" = employees.id
	WHERE
		"brigadeId" = A.id
);

-- Для кожного обʼєкту визначити матеріал, який використовується найбільше
SELECT
	A.name,
	materials.name
FROM
	road_objects AS A
INNER JOIN activities ON
	A.id = activities."roadObjectId"
INNER JOIN used_materials ON
	used_materials."activityId" = activities.id
INNER JOIN materials ON
	used_materials."materialId" = materials.id
GROUP BY
	A.id,
	materials.name,
	count
HAVING
	count >= (
	SELECT
		max(count)
	FROM
		road_objects
	INNER JOIN activities ON
		road_objects.id = activities."roadObjectId"
	INNER JOIN used_materials ON
		used_materials."activityId" = activities.id
	WHERE
		"roadObjectId" = A.id
);

-- 8
-- Для яких обʼєктів не виконувалася жодна діяльність
SELECT road_objects.name FROM road_objects
LEFT JOIN activities ON activities."roadObjectId" = road_objects.id
WHERE activities.id is NULL

SELECT road_objects.name FROM road_objects
WHERE id NOT IN (
	SELECT "roadObjectId" FROM activities
)

SELECT road_objects.name FROM road_objects
WHERE NOT EXISTS (
	SELECT * FROM activities
	WHERE road_objects.id="roadObjectId"
)

-- Яким працівникам не сплатили жодного платежу?
SELECT "fullName" FROM employees
left JOIN employee_payments ON employees.id = employee_payments."employeeId"
WHERE employee_payments.id IS NULL

SELECT "fullName" FROM employees
WHERE id NOT IN (
	SELECT "employeeId" FROM employee_payments
)

SELECT "fullName" FROM employees
WHERE NOT EXISTS (
	SELECT * FROM employee_payments
	WHERE employees.id="employeeId"
)

-- 9
-- Визначити робітників з найбільшою та найменшою виплатою
SELECT
	max(sum),
	"fullName",
	'Max payment' AS COMMENT
FROM
	employee_payments
INNER JOIN employees ON
	"employeeId" = employees.id
GROUP BY
	employees.id
HAVING
	max(sum) >= (
	SELECT
		max(sum)
	FROM
		employee_payments
	INNER JOIN employees ON
		"employeeId" = employees.id
)
UNION ALL
SELECT
	min(sum),
	"fullName",
	'Min payment' AS COMMENT
FROM
	employee_payments
INNER JOIN employees ON
	"employeeId" = employees.id
GROUP BY
	employees.id
HAVING
	min(sum) <= (
	SELECT
		min(sum)
	FROM
		employee_payments
	INNER JOIN employees ON
		"employeeId" = employees.id
)

-- Визначити бригади з максимальною та мінімальною кількістю робітників

SELECT
	count(*),
	name,
	'Maximum employees' AS COMMENT
FROM
	brigades
INNER JOIN employees ON
	employees."brigadeId" = brigades.id
GROUP BY
	brigades.id
HAVING
	count(*) >= (
	SELECT
		max(count)
	FROM
		(
		SELECT
			count(*)
		FROM
			brigades
		INNER JOIN employees ON
			employees."brigadeId" = brigades.id
		GROUP BY
			brigades.id) AS A)
UNION ALL
SELECT
	count(*),
	name,
	'Minimun employees' AS COMMENT
FROM
	brigades
INNER JOIN employees ON
	employees."brigadeId" = brigades.id
GROUP BY
	brigades.id
HAVING
	count(*) <= (
	SELECT
		min(count)
	FROM
		(
		SELECT
			count(*)
		FROM
			brigades
		INNER JOIN employees ON
			employees."brigadeId" = brigades.id
		GROUP BY
			brigades.id) AS A)


-- 10
-- В поле з додатковою інформацією відповідного матеріала записати "Most used"
UPDATE
	materials
SET
	"extraInfo" = 'Most used'
WHERE
	id in (
	SELECT
		"materialId"
	FROM
		used_materials
	GROUP BY
		"materialId"
	HAVING
		sum(count) >= (
		SELECT
			max(sum)
		FROM
			(
			SELECT
				sum(count),
				"materialId"
			FROM
				used_materials
			GROUP BY
				"materialId" ) AS A
))

-- В поле з додатковою інформацією відповідного типу роботи записати "Most frequent"
UPDATE
	work_types
SET
	"extraInfo" = 'Most frequent'
WHERE
	id in (
	SELECT
		"workTypeId"
	FROM
		works
	GROUP BY
		"workTypeId"
	HAVING
		count(*) >= (
		SELECT
			max(count)
		FROM
			(
			SELECT
				count(*),
				"workTypeId"
			FROM
				works
			GROUP BY
				"workTypeId") AS A))