<?php
use \Firebase\JWT\JWT;

class UserController extends BaseController
{
    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $arrUsers = $this->userModel->getUsers();
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function addUser($username, $email, $password) {
        try {
            if ($this->userModel->addUser($email, $username, password_hash($password, PASSWORD_DEFAULT))) {
                $this->sendOutput(
                    json_encode(array(
                        'Account_Added' => true
                    )),
                    array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                );
            } else {
                $this->sendOutput(
                    json_encode(array(
                        'Account_Added' => false
                )),
                    array('Content-Type: application/json', 'HTTP/1.1 400 Bad Request')
                );
            }
        } catch (Error $e) {
            $this->sendError($e);
        }   
    }

    public function login($username, $password) {
        try {
            $userInfo = $this->userModel->getUser($username);
            if (count($userInfo) != 1 || $userInfo[0]['username'] != $username || !password_verify($password, $userInfo[0]['password'])) {
                $this->sendOutput(
                    json_encode(array(
                        'Login' => false
                )),
                    array('Content-Type: application/json', 'HTTP/1.1 401 Bad Request')
                );
            }

            $token = array(
                "iat" => time(),
                "exp" => time() + 60 * 60,
                "iss" => 'https://nsgibson.w3.uvm.edu/Surf_Api/index.php',
                "data" => array(
                    "id" => $userInfo[0]['userId'],
                    "username" => $userInfo[0]['username'],
                    "email" => $userInfo[0]['email'],
                )
             );
            $jwt = JWT::encode($token, JWT_KEY, 'HS256');
            $this->sendOutput(
                json_encode(
                    array(
                        "Login" => true,
                        "jwt" => $jwt
                    )
                )
                    );

        } catch (Error $e) {
            error_log($e->getMessage());
            $this->sendError($e);
        }
    }
}
