<?php
// require the general classes
require("config/loader.php");
require("config/basecontroller.php");
require("config/basemodel.php");

// require the model classes
require("models/slider.php");

// require the controller classes
require("controllers/home.php");

// create the controller and execute the action
$loader = new Loader($_GET);
$controller = $loader->CreateController();
$controller->ExecuteAction();