<?php 
define("PROJECT_ROOT_PATH", __DIR__ . "/../");

require_once PROJECT_ROOT_PATH . "/inc/config.php";
require_once PROJECT_ROOT_PATH . 'libs/php-jwt-master/src/BeforeValidException.php';
require_once PROJECT_ROOT_PATH . 'libs/php-jwt-master/src/ExpiredException.php';
require_once PROJECT_ROOT_PATH . 'libs/php-jwt-master/src/SignatureInvalidException.php';
require_once PROJECT_ROOT_PATH . 'libs/php-jwt-master/src/JWT.php';
require_once PROJECT_ROOT_PATH . 'libs/php-jwt-master/src/Key.php';
require_once PROJECT_ROOT_PATH . "Controller/Api/BaseController.php";
require_once PROJECT_ROOT_PATH . "/Model/UserModel.php";
require_once PROJECT_ROOT_PATH . "/Model/GridModel.php";
require_once PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
require_once PROJECT_ROOT_PATH . "/Controller/Api/GridController.php";
require_once PROJECT_ROOT_PATH . 'Routing/Request.php';
require_once PROJECT_ROOT_PATH . 'Routing/Router.php';

?>