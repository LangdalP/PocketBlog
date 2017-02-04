<?php

namespace PocketBlog;

class ContentParser
{
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
        return array(
            'meta' => $metadata,
            'content' => $remaining
        );
    }

    public static function parseFile($fileName) {
        global $pocketBlogRoot;
        $raw_content = @file_get_contents($pocketBlogRoot . '/posts/' . $fileName);
        if ($raw_content === false) return false;
        $contentWithMeta = ContentParser::consumeMetadata($raw_content);
        $contentWithMeta['content'] = \Parsedown::instance()->text($contentWithMeta['content']);
        return $contentWithMeta;
    }
}

?>