<?php

declare(strict_types=1);

namespace App\Models;

class ProductModel extends AbstractModel
{
    public static function getAll(int $returnMod = 0): array
    {
        return static::queryAllData(self::GET_ALL_PRODUCTS, $returnMod);
    }

    public static function get(string $key, bool $isArrayReturn = false): array
    {
        return $isArrayReturn ? static::queryData(self::GET_CATEGORY_PRODUCTS, ["category" => $key], $isArrayReturn) : static::queryData(self::GET_PRODUCT, ["id" => $key]);
    }
}
