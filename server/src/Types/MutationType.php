<?php

declare(strict_types=1);

namespace App\Types;

use App\Controllers\OrderController;
use App\Types\Input\InputOrderType;
use App\Utils\Logger;
use App\Utils\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Throwable;

class MutationType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                "createOrder" => [
                    "type" => Type::string(),
                    "args" => [
                        "orders" => [
                            "type" => Type::listOf(TypeRegistry::getType(InputOrderType::class)),
                        ],
                    ],
                    "resolve" => static function ($rootValue, array $args): string {
                        try {
                            return OrderController::createOrder($args["orders"]);
                        } catch (Throwable $e) {
                            Logger::error($e);
                        }
                    },
                ],
            ],
        ]);
    }
}
