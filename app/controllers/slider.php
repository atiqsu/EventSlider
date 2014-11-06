<?php //defined('SYSPATH') or die('No direct script access.');

class Slider extends BaseController {
    protected function Index() {
        $viewmodel = new SliderModel();
        $this->ReturnView($viewmodel->Index(), true);
    }
}