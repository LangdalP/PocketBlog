<?php

require __DIR__.'/vendor/autoload.php';

$pocketBlogRoot = __DIR__;
$ignoredPosts = array(".", "..", "404.md");

Twig_Autoloader::register();
$templateLoader = new Twig_Loader_Filesystem(__DIR__ . '/views');
$twig = new Twig_Environment($templateLoader, array(
    'cache' => __DIR__ . '/twig-cache',
));

$router = new AltoRouter();

$router->map('GET', '/', 'PocketBlog\\BlogController::index');
$router->map('GET', '/post/[:name]', 'PocketBlog\\BlogController::viewPost');
$router->map('GET', '/posts/', 'PocketBlog\\ContentManager::listPosts');

// Match current request url
$match = $router->match();

if ( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] ); 
}
else if ( $match && !is_callable( $match['target'] ) ) {
    // Matched route, but can't call target
    header( $_SERVER["SERVER_PROTOCOL"] . ' 503 Service Unavailable');
    echo "Error 503 Service Unavailable  -  Found route,  but couldn't call target";
}
else {
    // No route was matched
    // header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    PocketBlog\BlogController::send404Response();
}

?>
