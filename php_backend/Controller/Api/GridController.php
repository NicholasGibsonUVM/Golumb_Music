<?php
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GridController extends BaseController
{
    private $gridModel;

    public function __construct() {
        $this->gridModel = new GridModel();
    }

    public function getGrids($limit = '') {
        try {
            $grids = array_map(function($grid) {
                $grid['golombPattern'] = json_decode($grid['golombPattern']);
                return $grid;
            }, $this->gridModel->getGrids($limit));
            error_log(print_r($grids, TRUE));
            $this->sendOutput(
                json_encode($grids),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } catch (Error $e) {
            error_log("Error Retrieving Grids: " . $e->getMessage());
            $this->sendError($e);
        }
    }

    public function getGrid($gridId) {
        try {
            $grid = $this->gridModel->getGrid($gridId);
            if ($grid) {
                $grid[0]['golombPattern'] = json_decode($grid[0]['golombPattern']);
                $this->sendOutput(
                    json_encode($grid[0]),
                    array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                );
            } else {
                $this->sendOutput(
                    json_encode(
                        array(
                            'Message' => 'Grid id not found'
                        )),
                    array('Content-Type: application/json', 'HTTP/1.1 400 Bad Request')
                );
            }
        } catch (Error $e) {
            error_log("Error Retrieving Grid: " . $e->getMessage());
            $this->sendError($e);
        }
    }

    public function saveGrid($grid, $jwtToken) {
        try {
            if($jwtToken) {
                $decodedToken = JWT::decode($jwtToken, new Key(JWT_KEY, 'HS256'));
                //Cast to Array
                $decodedToken = json_decode(json_encode($decodedToken), true);

                if ($this->gridModel->saveGrid($decodedToken['data']['id'], $grid)) {
                    $this->sendOutput(
                        json_encode(
                            array(
                                'Message' => 'Grid Saved'
                            )),
                        array('Content-Type: application/json', 'HTTP/1.1 200 OK')  
                    );
                } else {
                    $this->sendOutput(
                        json_encode(
                            array(
                                'Message' => 'Couldn\'t save grid'
                            )),
                        array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
                    );
                }
            } else {
                $this->sendOutput(
                    json_encode(
                        array(
                            'Message' => 'Empty JWT Token'
                        )),
                    array('Content-Type: application/json', 'HTTP/1.1 401 Unauthorized')
                );
            }
        } catch (Error $e){
            error_log("Error Saving Grid: " . $e->getMessage());
            $this->sendError($e);
        }
    }
}

?>