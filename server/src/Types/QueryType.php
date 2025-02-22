<?php

declare(strict_types=1);

namespace App\Types;

use App\Models\CategoryModel;
use App\Models\OrderModel;
use App\Models\ProductModel;
use App\Types\Output\OrderType;
use App\Types\Output\ProductType;
use App\Utils\OutputResolver;
use App\Utils\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use PDO;

class QueryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => "Query",
            "fields" => [
                "categories" => [
                    "type" => Type::listOf(Type::string()),
                    "description" => "This returns all categories",
                    "resolve" => fn() => OutputResolver::resolver([CategoryModel::class, "getAll"], [PDO::FETCH_COLUMN]),
                ],
                'products' => [
                    "type" => Type::listOf(TypeRegistry::getType(ProductType::class)),
                    "description" => "This returns all products",
                    "resolve" => fn() => OutputResolver::resolver([ProductModel::class, 'getAll']),
                ],
                'product' => [
                    "type" => TypeRegistry::getType(ProductType::class),
                    "description" => "This returns a single product",
                    "args" => [
                        "id" => Type::nonNull(Type::id()),
                    ],
                    "resolve" => fn($rootValue, array $args) => OutputResolver::resolver([ProductModel::class, 'get'], [$args["id"]]),
                ],
                "categProduct" => [
                    "type" => Type::listOf(TypeRegistry::getType(ProductType::class)),
                    "description" => "This returns products of same category",
                    "args" => [
                        "categ" => Type::nonNull(Type::string()),
                    ],
                    "resolve" => fn($rootValue, array $args) => OutputResolver::resolver([ProductModel::class, "get"], [$args["categ"]], true),
                ],
                "orders" => [
                    "type" => Type::listOf(TypeRegistry::getType(OrderType::class)),
                    "description" => "This returns all orders",
                    "resolve" => fn() => OutputResolver::resolver([OrderModel::class, "getAll"]),
                ],
                "user_orders" => [
                    "type" => Type::listOf(TypeRegistry::getType(OrderType::class)),
                    "description" => "This returns all orders a user has made",
                    "args" => [
                        "userId" => Type::nonNull(Type::id()),
                    ],
                    "resolve" => fn($rootValue, $args) => OutputResolver::resolver([OrderModel::class, 'getUserAll'], [["userId" => $args["userId"]]]),
                ],
            ],
        ]);
    }
}
