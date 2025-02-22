<?php

declare(strict_types=1);

namespace App\Utils;

use Throwable;

final class OutputResolver
{
    public static function resolver(callable $resolveFunc, array $arg = [], bool $isArgArray = false)
    {
        try {
            $args[0] = $arg[0] ?? 0;
            $args[1] = $isArgArray;
            return $isArgArray ? call_user_func_array($resolveFunc, $args) : call_user_func($resolveFunc, $arg[0] ?? 0);
        } catch (Throwable $e) {
            echo "Error thrown";
            Logger::error($e);
        }
    }
}
