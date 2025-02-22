<?php

declare(strict_types=1);

namespace App\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "Product",
            "description" => "Type for Product",
            "fields" => static fn(): array => [
                'id' => Type::nonNull(Type::id()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::nonNull(Type::int()),
                'description' => Type::nonNull(Type::string()),
                'category' => Type::nonNull(Type::string()),
                'brand' => Type::nonNull(Type::string()),
                'gallery' => Type::nonNull(Type::string()),
                "prices" => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
