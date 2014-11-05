<!-- TODO: Split this file up... -->
<!DOCTYPE html>

<html>
<head>
    <meta charset="UTF-8">

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

    <script type="text/javascript" src="resources/js/event-slider.js"></script>
    <link rel="stylesheet" type="text/css" href="resources/css/event-slider.css" />

    <title>New Slider - Slider</title>

    <?php
    //ini_set('display_errors', 'On');
    //error_reporting(E_ALL | E_STRICT);

    $data = file_get_contents('./data/slides.json', true); // TODO: error checking?
    $slides = json_decode($data, true);

    //TODO: check if image is active! check if file exists?

    function getSlideTitles() {
        global $slides;

        foreach ($slides["slides"] as $slide) {
            $id = $slide["id"];
            $title =  $slide["title"];
            echo "<p class='sliderTitle' id='title$id'>$title</p>";
        }
    }

    function getSlideImgs() {
        global $slides;

        foreach ($slides["slides"] as $slide) {
            $id =  $slide["id"];
            $url = $slide["url"];
            $alt = $slide["alt"];
            $ext =  $slide["ext"];

            echo "<a class='sliderImg' id='img$id' ";

            if ($url != "") { echo "href='$url' target='_blank' "; }
            if ($alt != "") { echo "title='$alt' "; }

            echo "><img src='img/active/$id.$ext'></img></a>";
        }
    }

    function getSlideCaptions() {
        global $slides;

        foreach ($slides["slides"] as $slide) {
            $id = $slide["id"];
            $caption = $slide["caption"]; //TODO: toString()? (to escape quotes)
            echo "<p class='sliderTxt' id='txt$id'>$caption</p>";
        }
    }
    ?>
</head>

<body>
<div class="sliderContainer">
    <div id="leftButtonCont"><input type="button" id="leftButton" value="&lt;" /></div>
    <div id="rightButtonCont"><input type="button" id="rightButton" value="&gt;" /></div>

    <div class="title">
        <div id="titleContent">
            <?php getSlideTitles(); ?>
        </div>
    </div>

    <div id="image">
        <?php getSlideImgs(); ?>
    </div>

    <div class="caption">

        <div id="captionBar">
            &nbsp;
        </div>

        <div id="captionContent">
            <?php getSlideCaptions(); ?>
        </div>

    </div>

</div>
</body>
</html>