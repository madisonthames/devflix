INSERT INTO my_list
(title, backdrop, overview, movie_id, user_id)
VALUES
($1, $2, $3, $4, $5)
returning *;