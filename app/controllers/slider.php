<?php
class Slider extends BaseController {
    protected function Index() {
        $viewmodel = new SliderModel();
        $this->ReturnView($viewmodel->Index(), true);
    }
}