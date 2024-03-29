<?php
include_once 'IRequest.php';

class Request implements IRequest
{
  function __construct()
  {
    $this->bootstrapSelf();
  }

  private function bootstrapSelf()
  {
    foreach($_SERVER as $key => $value)
    {
      $this->{$this->toCamelCase($key)} = $value;
    }
  }

  private function toCamelCase($string)
  {
    $result = strtolower($string);
        
    preg_match_all('/_[a-z]/', $result, $matches);

    foreach($matches[0] as $match)
    {
        $c = str_replace('_', '', strtoupper($match));
        $result = str_replace($match, $c, $result);
    }

    return $result;
  }

  public function getBody()
  {
    $body = array();
    if($this->requestMethod === "GET")
    {
      error_log("----Get Request Params----");
      foreach($_GET as $key => $value) {
        $body[$key] = filter_input(INPUT_GET, $key, FILTER_SANITIZE_SPECIAL_CHARS);
        error_log($key . ": " . $value);
      }
      error_log("--------------------------");
      return $body;
    }


    if ($this->requestMethod == "POST")
    {

      error_log("---Post Request Params----");
      foreach($_POST as $key => $value)
      {
        $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
        error_log($key . ": " . $value);
      }
      error_log("--------------------------");

      return $body;
    }
  }

  public function getJsonBody($key)
  {
    if ($this->requestMethod == "POST")
    {
      return json_encode($_POST[$key]);
    }
  }
}