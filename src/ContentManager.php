<?php

namespace PocketBlog;

class ContentManager
{
    public static function listPosts() {
        global $ignoredPosts, $pocketBlogRoot;
        $content_dir = $pocketBlogRoot . '/posts/';
        $files_and_folders = scandir($content_dir);
        $post_filenames = array();
        foreach ($files_and_folders as $item) {
            if (!in_array($item, $ignoredPosts)) {
                $post_filenames[] = $item;
            }
        }
        return $post_filenames;
    }
}

?>