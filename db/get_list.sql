SELECT title, backdrop, overview, movie_id from my_list
JOIN users on users.id = my_list.user_id
WHERE users.id = $1