<?php

declare(strict_types=1);

namespace App\Models;

class AttributesModel extends AbstractModel
{
    public static function getAll(int $returnMod = 0): array
    {
        return [];
    }

    public static function get(string $key): array
    {
        return static::queryData(self::GET_ATTRIBUTES, ["product_id" => $key]);
    }
}
