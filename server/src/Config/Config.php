<?php

namespace App\Config;

final class Config
{
    private static function env(string $key): string
    {
        return $_ENV[$key];
    }

    public static function getConfig(): array
    {
        return
            [
                "host" => self::env("DB_HOST"),
                "port" => self::env("DB_PORT"),
                "dbname" => self::env("DB_NAME"),
                "charset" => "utf8mb4",
            ];
    }
}

Config::getConfig();
