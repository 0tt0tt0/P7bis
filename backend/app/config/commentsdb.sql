Delete from comments;

INSERT INTO comments (idcomment, comment_content, comment_datetime, comment_post_id, comment_user_id) VALUES (1, "A", "2000-01-03 10:10:10", 1, 1);
INSERT INTO comments (idcomment, comment_content, comment_datetime, comment_post_id, comment_user_id) VALUES (2, "B", "2000-01-03 10:10:11", 1, 2);
INSERT INTO comments (idcomment, comment_content, comment_datetime, comment_post_id, comment_user_id) VALUES (3, "C", "2000-01-03 10:10:12", 3, 4);
INSERT INTO comments (idcomment, comment_content, comment_datetime, comment_post_id, comment_user_id) VALUES (4, "D", "2000-01-03 10:10:13", 4, 4);
INSERT INTO comments (idcomment, comment_content, comment_datetime, comment_post_id, comment_user_id) VALUES (5, "E", "2000-01-03 10:10:13", 5, 4);

SELECT * FROM comments as c inner join users as u ON c.comment_user_id = u.id_user ORDER BY c.comment_datetime DESC

