<?php

namespace App\Providers;

class Meta
{
    protected static $meta = [];
    protected static $properties = [];
    protected static $title = '';
    protected static $canonical = '';
    protected static $robots = '';
    protected static $structuredData = [];

    public static function addMeta($name, $content)
    {
        static::$meta[$name] = $content;
    }

    public static function addProperty($property, $content)
    {
        static::$properties[$property] = $content;
    }

    public static function setTitle($title)
    {
        static::$title = $title;
    }

    public static function setCanonical($url)
    {
        static::$canonical = $url;
    }

    public static function setRobots($robots)
    {
        static::$robots = $robots;
    }

    public static function addStructuredData($data)
    {
        static::$structuredData[] = $data;
    }

    public static function getTitle()
    {
        return static::$title;
    }

    public static function render()
    {
        $html = '';

        // Robots
        if (static::$robots) {
            $html .= '<meta name="robots" content="' . static::$robots . '" />' . PHP_EOL;
        }

        // Canonical URL
        if (static::$canonical) {
            $html .= '<link rel="canonical" href="' . static::$canonical . '" />' . PHP_EOL;
        }

        // Meta tags with name attribute
        foreach (static::$meta as $name => $content) {
            $html .= '<meta name="' . htmlspecialchars($name) . '" content="' . htmlspecialchars($content) . '" />' . PHP_EOL;
        }

        // Meta tags with property attribute (Open Graph)
        foreach (static::$properties as $property => $content) {
            $html .= '<meta property="' . htmlspecialchars($property) . '" content="' . htmlspecialchars($content) . '" />' . PHP_EOL;
        }

        // Structured Data (JSON-LD)
        if (!empty(static::$structuredData)) {
            foreach (static::$structuredData as $data) {
                $html .= '<script type="application/ld+json">' . PHP_EOL;
                $html .= json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $html .= PHP_EOL . '</script>' . PHP_EOL;
            }
        }

        return $html;
    }

    public static function cleanup()
    {
        static::$meta = [];
        static::$properties = [];
        static::$title = '';
        static::$canonical = '';
        static::$robots = '';
        static::$structuredData = [];
    }
}
