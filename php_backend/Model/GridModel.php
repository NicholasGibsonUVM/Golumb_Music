<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class GridModel extends Database 
{
    public function getGrids($limit) {
        $limitString = $limit == '' ? $limitString = '' : $limitString = "LIMIT $limit";
        return $this->select("SELECT * FROM `GolombPatterns` " . $limitString);
    }

    public function getGrid($patternId) {
        return $this->select("SELECT * FROM `GolombPatterns` WHERE patternId = '$patternId'");
    }

    public function saveGrid($userId, $pattern) {
        return $this->insert("INSERT INTO `GolombPatterns` (`userId`, `golombPattern`) VALUES($userId, '$pattern')", []);
    }
}
?>