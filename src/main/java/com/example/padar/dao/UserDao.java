package com.example.padar.dao;

import com.example.padar.mapper.UserMapper;
import com.example.padar.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String SQL_GET_ALL_USERS = "SELECT * FROM user";

    private static final String SQL_DELETE_USER_BY_ID = "DELETE FROM user WHERE user_id=?";

    private static final String SQL_MAKE_NEW_USER = "INSERT INTO user(name,surname,email) VALUES(?,?,?)";

    private static final String SQL_UPDATE_USER = "UPDATE user SET name = ?, surname = ?, email = ? WHERE user_id=?";
    public List<User> getAllUsers() {
        return jdbcTemplate.query(SQL_GET_ALL_USERS, new UserMapper());
    }

    public void deleteUserById(int user_id) {
        jdbcTemplate.update(SQL_DELETE_USER_BY_ID, user_id);
    }

    public void addUser(User user) {
        jdbcTemplate.update(SQL_MAKE_NEW_USER,
                user.getName(),
                user.getSurname(),
                user.getEmail());
    }


    public void updateUser(User user) {
        jdbcTemplate.update(SQL_UPDATE_USER,
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getUser_id());
    }
}
