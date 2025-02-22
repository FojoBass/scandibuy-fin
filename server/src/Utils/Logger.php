<?php

declare(strict_types=1);

namespace App\Utils;

use Throwable;

final class Logger
{
    public static function echoDie(array $args)
    {
        foreach ($args as $arg) {
            echo $arg;
        }
        die();
    }

    public static function dumpDie(array $args)
    {
        foreach ($args as $arg) {
            var_dump($arg);
        }
        die();
    }

    public static function error(Throwable $e)
    {
        self::dumpDie([$e->getMessage(), $e->getFile(), $e->getLine()]);
    }
}
