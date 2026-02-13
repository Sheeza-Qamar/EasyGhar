-- Run this in MySQL (easyghar) to see if workers exist and why they might not show in admin.
-- Use: mysql -u ... -p easyghar < database/check_workers.sql  OR run in your MySQL client.

USE easyghar;

SELECT 'Workers in table:' AS info;
SELECT w.id, w.user_id, w.city_id, w.verification_status, w.created_at
FROM workers w
ORDER BY w.created_at DESC;

SELECT 'Workers with user and city (same as admin API):' AS info;
SELECT w.id, u.full_name, u.phone, c.city_name, w.verification_status
FROM workers w
JOIN users u ON w.user_id = u.id
LEFT JOIN cities c ON w.city_id = c.id
ORDER BY w.created_at DESC;
