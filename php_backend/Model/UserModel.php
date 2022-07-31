<?php 
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
 
class UserModel extends Database
{
    public function getUsers()
    {
        return $this->select("SELECT `userId`, `username`, `email`, `verified` FROM Users");
    }

    public function addUser($email, $username, $password)
    {
        return $this->insert("INSERT INTO Users (`username`, `email`, `verified`, `password`) VALUES( '$username' , '$email' , 0, '$password')", []);
    }

    public function getUser($username) 
    {
        return $this->select("SELECT * FROM Users WHERE `username` = '$username'");
    }
}
?>