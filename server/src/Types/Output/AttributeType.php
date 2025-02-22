<?php

declare(strict_types=1);

namespace App\Types\Output;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "Attribute",
            "description" => "Type for Product Atrributes",
            "fields" => [
                "product_id" => Type::nonNull(Type::id()),
                "attributes" => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
