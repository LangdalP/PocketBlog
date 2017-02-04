<?php

namespace PocketBlog;

// TODO: Make a separate one_post_page

class BlogController
{
    public static function index() {
        global $twig;
        $template = $twig->load('index_page.twig');
        $contentWithMeta = ContentParser::parseFile('example.md');
        echo $template->render(
            array(
                'pageTitle' => $contentWithMeta['meta']['Title'],
                'article' => $contentWithMeta['content']
        ));
    }

    public static function viewPost($name) {
        global $twig;
        $template = $twig->load('single_post_page.twig');
        $contentWithMeta = ContentParser::parseFile("$name.md");
        if ( $contentWithMeta === false ) BlogController::send404Response();
        echo $template->render(
            array(
                'pageTitle' => $contentWithMeta['meta']['Title'],
                'article' => $contentWithMeta['content']
        ));
    }

    // Later, should be able to specify what posts
    public static function viewPostList() {
    }

    public static function send404Response() {
        header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');

        global $twig;
        $template = $twig->load('single_post_page.twig');
        $contentWithMeta = ContentParser::parseFile('404.md');
        echo $template->render(
            array(
                'pageTitle' => $contentWithMeta['meta']['Title'],
                'article' => $contentWithMeta['content']
        ));
    }
}

?>