<?php

namespace PocketBlog;

class BlogController
{
    public static function index() {
        global $twig;
        $template = $twig->load('master.twig');
        echo $template->render(
            array(
                'pageTitle' => 'Home'
        ));
    }

    public static function viewArticle($name) {
        echo "<p>$name</p>";
    }
}

?>