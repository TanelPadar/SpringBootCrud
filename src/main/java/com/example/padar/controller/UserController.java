package com.example.padar.controller;

import com.example.padar.dao.UserDao;
import com.example.padar.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    private final UserDao UserDao;

    public UserController(UserDao UserDao) {
        this.UserDao = UserDao;
    }

    @GetMapping("/user/all")
    public List<User> getAllUsers() {
        return UserDao.getAllUsers();
    }

    @DeleteMapping("/user/delete/{id}")
    public void deleteUsersById(@PathVariable int id){UserDao.deleteUserById(id);}

    @PostMapping("/user/adduser")
    public void addUsers(@RequestBody User user){UserDao.addUser(user);}

    @PutMapping("/user/edituser")
    public void editUsers(@RequestBody User user){UserDao.updateUser(user);}
}
