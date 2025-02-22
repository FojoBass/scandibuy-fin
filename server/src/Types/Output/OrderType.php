<?php

declare(strict_types=1);

namespace App\Types\Output;

use App\Models\ProductModel;
use App\Utils\OutputResolver;
use App\Utils\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "OrderOutput",
            "fields" => [
                "id" => Type::nonNull(Type::id()),
                "qty" => Type::nonNull(Type::int()),
                "attibutes" => Type::nonNull(Type::string()),
                "product" => [
                    "type" => TypeRegistry::getType(ProductType::class),
                    "resolve" => fn(array $order) => OutputResolver::resolver([ProductModel::class, "get"], [$order["product_id"]]),
                ],
            ],
        ]);
    }
}
