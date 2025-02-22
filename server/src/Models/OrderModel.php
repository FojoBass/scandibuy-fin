<?php

declare(strict_types=1);

namespace App\Models;

class OrderModel extends AbstractModel
{
    public static function create(array $order)
    {
        static::setData(self::CREATE_ORDER, $order);
    }

    public static function getAll(int $returnMod = 0): array
    {
        return static::queryAllData(self::GET_ALL_ORDERS, $returnMod);
    }

    public static function getUserAll($params = []): array
    {
        return static::queryAllData(self::GET_ALL_USER_ORDERS, 0, $params);
    }

    public static function get(string $key): array
    {
        return static::queryData(self::GET_ORDER, ["userId" => $key]);
    }
}
