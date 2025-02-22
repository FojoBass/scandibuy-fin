<?php

declare(strict_types=1);

namespace App\Types\Scalars;

use GraphQL\Language\AST\ListValueNode;
use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\ObjectValueNode;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Type\Definition\CustomScalarType;

class JsonType extends CustomScalarType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Json',
            'description' => 'The `Json` scalar type represents dynamic JSON values.',
            'serialize' => fn($value) => $value,
            'parseValue' => fn($value) => $value,
            'parseLiteral' => function ($valueNode) {
                return $this->parseNode($valueNode);
            },
        ]);
    }

    private function parseNode(Node $valueNode)
    {
        switch (true) {
            case $valueNode instanceof StringValueNode:
                return json_decode($valueNode->value, true);
            case $valueNode instanceof ObjectValueNode:
                $value = [];
                foreach ($valueNode->fields as $field) {
                    $value[$field->name->value] = $this->parseNode($field->value);
                }
                return $value;
            case $valueNode instanceof ListValueNode:
                return array_map([$this, 'parseNode'], iterator_to_array($valueNode->values));
            default:
                return null;
        }
    }
}
