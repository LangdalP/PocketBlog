<?php

namespace PocketBlog;

class ContentParser
{
    public static function createByline($metadata) {
        $date_string = null;
        $author_string = null;
        $byline = 'Written';
        if (array_key_exists('Date', $metadata)) $date_string = $metadata['Date'];
        if (array_key_exists('Author', $metadata)) $author_string = $metadata['Author'];

        if ($date_string !== null)
            $byline = $byline . " on the $date_string";
        if ($author_string !== null)
            $byline = $byline . " by $author_string";
        if ($byline === 'Written')
            $byline = '';
        return $byline;
    }

    // Add byline below first heading
    public static function addBylineToContent($initial_content, $metadata) {
        $byline = ContentParser::createByline($metadata);
        $separator = "\r\n";
        $processed = '';
        $line = strtok($initial_content, $separator);
        while ($line !== false) {
            $processed = $processed . $line . "\n";
            $lineStart = substr($line, 0, 1);
            if ($lineStart === '#') {
                $processed = $processed . "<p class=\"article-info\">$byline</p>\n";
                break;
            }
        }
        $remaining = strtok('');
        return $processed . $remaining;
    }

    public static function consumeMetadata($fileContents) {
        $separator = "\r\n";
        $line = strtok($fileContents, $separator);

        $foundMetaStart = false;
        $metadata = array();
        while ($line !== false) {
            $lineStart = substr($line, 0, 3);
            if ($lineStart === '---' && $foundMetaStart === false) $foundMetaStart = true;
            else if ($lineStart === '---' && $foundMetaStart === true) break;
            else if ($foundMetaStart === true) {
                // Process metadata line
                $metaParts = explode(':', $line);
                $metaKey = trim($metaParts[0]);
                $metaValue = trim($metaParts[1]);
                $metadata[$metaKey] = $metaValue;
            }
            $line = strtok( $separator );
        }
        // Return metadata and remaining text
        $remaining = strtok('');
        $content_with_metadata = array(
            'meta' => $metadata,
            'content' => $remaining
        );
        return $content_with_metadata;
    }

    public static function parseFile($fileName) {
        global $pocketBlogRoot;
        $raw_content = @file_get_contents($pocketBlogRoot . '/posts/' . $fileName);
        if ($raw_content === false) return false;
        $contentWithMeta = ContentParser::consumeMetadata($raw_content);
        $contentWithByline = ContentParser::addBylineToContent($contentWithMeta['content'], $contentWithMeta['meta']);
        $contentWithMeta['content'] = \Parsedown::instance()->text($contentWithByline);
        return $contentWithMeta;
    }
}

?>