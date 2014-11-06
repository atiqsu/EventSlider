<?php //defined('SYSPATH') or die('No direct script access.');

abstract class BaseController {
    protected $urlvalues;
    protected $action;

    public function __construct($action, $urlvalues) {
        $this->action = $action;
        $this->urlvalues = $urlvalues;
    }

    public function ExecuteAction() {
        return $this->{$this->action}();
    }

    protected function ReturnView($viewmodel, $fullview) {
        $viewloc = 'views/' . get_class($this) . '/' . $this->action . '.php';
        require($viewloc);
    }
}