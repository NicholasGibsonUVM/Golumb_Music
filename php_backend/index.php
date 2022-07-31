<?php 
require __DIR__ . "/inc/bootstrap.php";

$router = new Router(new Request);

$router->get('/Surf_Api/index.php/user/list', function($request) {
    $userController = new UserController();
    $userController->listAction();
});

$router->post('/Surf_Api/index.php/user/add', function($request) {
    $userController = new UserController();
    $requestBody = $request->getBody();
    if (array_key_exists("username", $requestBody) && array_key_exists("email", $requestBody) && array_key_exists('password', $requestBody)) {
        $userController->addUser($requestBody['username'], $requestBody['email'], $requestBody['password']);
    } else {
        $responseController = new BaseController();
        $responseController->sendOutput(
            json_encode(array('error' => "Username or Email Not Given")),
            array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
        );
    }
});

$router->post('/Surf_Api/index.php/user/login' , function($request) {
    $userController = new UserController();
    $requestBody = $request->getBody();
    if (array_key_exists("username", $requestBody) && array_key_exists("password", $requestBody)) {
        $userController->login($requestBody['username'], $requestBody['password']);
    } else {
        $responseController = new BaseController();
        $responseController->sendOutput(
            json_encode(array('error' => "Username or Password Not Given")),
            array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
        );
    }
});

$router->post('/Surf_Api/index.php/grid/save', function($request) {
    $gridController = new GridController();
    $requestBody = $request->getBody();
    if (array_key_exists('JWT', $requestBody) && array_key_exists('Grid', $requestBody)) {
        $gridController->saveGrid($request->getJsonBody('Grid'), $requestBody['JWT']);
    } else {
        $responseController = new BaseController();
        $responseController->sendOutput(
            json_encode(array('error' => "JWT Token not present or Grid not present")),
            array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
        );
    }
});

$router->get('/Surf_Api/index.php/grid/retrieve', function($request) {
    $gridController = new GridController();
    $requestBody = $request->getBody();
    if (array_key_exists('id', $requestBody)) {
        $gridController->getGrid($requestBody['id']);
    } else {
        $responseController = new BaseController();
        $responseController->sendOutput(
            json_encode(array('error' => "Grid id not present")),
            array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
        );
    }
});

$router->get('/Surf_Api/index.php/grid/retrieveAll', function($request) {
    $gridController = new GridController();
    $requestBody = $request->getBody();
    if (array_key_exists('limit', $requestBody)) {
        $gridController->getGrids($requestBody['limit']);
    } else {
        $gridController->getGrids();
    }
});
?>