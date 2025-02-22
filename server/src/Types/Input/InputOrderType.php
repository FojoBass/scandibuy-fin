<?php

declare(strict_types=1);

namespace App\Types\Input;

use App\Utils\TypeRegistry;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class InputOrderType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "OrderInput",
            "description" => "Type for input of user order",
            "fields" => [
                "product_id" => Type::nonNull(Type::id()),
                "attributes" => Type::nonNull(TypeRegistry::getJsonType()),
                "qty" => Type::nonNull(Type::int()),
            ],
        ]);
    }
}
