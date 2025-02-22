<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\OrderModel;

class OrderController
{
    public static function createOrder(array $orders): string
    {
        foreach ($orders as $order) {
            $id = uniqid();
            $order["id"] = $id;
            $order["attributes"] = json_encode($order["attributes"]);
            OrderModel::create($order);
        }
        return "Order created";
    }
}
