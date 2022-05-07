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