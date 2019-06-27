DELETE FROM my_list
WHERE user_id = $1 AND movie_id = $2
returning *