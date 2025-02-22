<?php

declare(strict_types=1);

namespace App\Models;

use App\Database\Database;

abstract class AbstractModel extends Database
{
    protected const GET_ALL_CATEGORIES = 'select * from categories';
    protected const GET_ALL_PRODUCTS = 'select * from products';
    protected const GET_PRODUCT = 'select * from products where id = :id';
    protected const GET_CATEGORY_PRODUCTS = 'select * from products where category = :category';

    protected const GET_ATTRIBUTES = 'select * from attributes where product_id = :product_id';

    protected const CREATE_ORDER = 'insert into orders (id, product_id, attributes, qty) values (:id, :product_id, :attributes, :qty)';
    protected const GET_ALL_USER_ORDERS = 'select * from orders where userId = :userId';
    protected const GET_ORDER = 'select * from orders where userId = :userId';
    protected const GET_ALL_ORDERS = 'select * from orders';

    abstract public static function getAll(int $returnMod = 0): array;

    abstract public static function get(string $key): array;
}
