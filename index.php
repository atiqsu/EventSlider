<?php

// Name of dir where application resources are located
$application = 'app';

//
$config = 'config';

define('APPPATH', realpath($application).DIRECTORY_SEPARATOR);

// define('SYSPATH', APPPATH.DIRECTORY_SEPARATOR.$config);
define('SYSPATH', realpath($config));


// define the system path


// require the general classes
require(APPPATH."config/loader.php");
require(APPPATH."config/basecontroller.php");
require(APPPATH."config/basemodel.php");

// require the model classes
require(APPPATH."models/slider.php");

// require the controller classes
require(APPPATH."controllers/slider.php");

// create the controller and execute the action
$loader = new Loader($_GET);
$controller = $loader->CreateController();
$controller->ExecuteAction();