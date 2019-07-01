UPDATE users
SET username = $2
WHERE username = $1
returning *;