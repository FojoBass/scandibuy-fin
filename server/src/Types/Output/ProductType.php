<?php

declare(strict_types=1);

namespace App\Types\Output;

use App\Models\AttributesModel;
use App\Utils\OutputResolver;
use App\Utils\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "Product",
            "description" => "Type for Product",
            "fields" => [
                'id' => Type::nonNull(Type::id()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::nonNull(Type::int()),
                'description' => Type::nonNull(Type::string()),
                'category' => Type::nonNull(Type::string()),
                'brand' => Type::nonNull(Type::string()),
                'gallery' => Type::nonNull(Type::string()),
                "prices" => Type::nonNull(Type::string()),
                "attributes" => [
                    "type" => TypeRegistry::getType(AttributeType::class),
                    "resolve" => fn(array $product) => OutputResolver::resolver([AttributesModel::class, "get"], [$product["id"]]),
                ],
            ],
        ]);
    }
}
