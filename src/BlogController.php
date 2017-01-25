<?php

namespace PocketBlog;

class BlogController
{
    public static function index() {
        global $twig;
        $template = $twig->load('master.twig');
        $contentWithMeta = ContentParser::parseFile('example.md');
        echo $template->render(
            array(
                'pageTitle' => $contentWithMeta['meta']['Title'],
                'article' => $contentWithMeta['content']
        ));
    }

    public static function viewPost($name) {
        echo "<p>$name</p>";
    }
}

?>