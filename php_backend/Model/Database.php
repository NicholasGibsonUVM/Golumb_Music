<?php
class DataBase
{
    public $pdo = '';
    public function __construct()
    {
        $this->pdo = null;
        $query = NULL;
        $dsn = 'mysql:host=webdb.uvm.edu;dbname=';

        try {
            $this->pdo = new PDO($dsn . DATABASE_NAME, DB_ADMIN_USERNAME, DB_ADMIN_PASS);

            if (!$this->pdo) {
                error_log('You are NOT connected to the database');
                return 0;
            } else {
                error_log('You are connected to the database');
                return $this->pdo;
            }
        } catch (PDOException $e) {
            $error_message = $e->getMessage();
            error_log("An error occured while connecting to the database: $error_message");
            error_log("Username: " . DB_ADMIN_USERNAME);
            error_log("Database Name: " . DATABASE_NAME);
        }
    }

    public function select($query, $values = '')
    {
        try {
            $statement = $this->pdo->prepare($query);
            
            if (is_array($values)) {
                $statement->execute($values);
            } else {
                $statement->execute();
            }

            $recordSet = $statement->fetchAll(PDO::FETCH_ASSOC);

            $statement->closeCursor();

            return $recordSet;
        } catch (PDOException $e) {
            error_log($this->displayQuery($query, $values));
            $error_message = $e->getMessage();
            error_log("An error occured while querying the database: $error_message");
        }
    }

    public function insert($query, $values)
    {
        try {
            error_log($this->displayQuery($query, $values));
            $statement = $this->pdo->prepare($query, $values);
            if (substr($query, 0, 6) != "INSERT") {
                return false;
                error_log("Invalid Insert Statment: Insert in wrong location or not present");
            }
            if ($statement->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            error_log("Error inserting into database " . $e->getMessage());
            return false;
        }
    }

    public function update($query, $values = '')
    {
        try {
            $statement = $this->pdo->prepare($query);
            if (substr($query, 0, 6) != "UPDATE") {
                return false;
            }
            if (is_array($values)) {
                if ($statement->execute($values)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }

    public function delete($query, $values = '')
    {
        try {
            $statement = $this->pdo->prepare($query);
            if (substr($query, 0, 6) != "DELETE") {
                return false;
            }
            if (is_array($values)) {
                if ($statement->execute($values)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }

    public function displayQuery($query, $values = '')
    {
            if (is_array($values)) {
                $needle = '?';
                $haystack = $query;
                foreach ($values as $value) {
                    $pos = strpos($haystack, $needle);
                    if ($pos !== false) {

                        $haystack = substr_replace($haystack, '"' . $value . '"', $pos, strlen($needle));
                    }
                }
                $query = $haystack;
            }
            return $query;
    }
}
