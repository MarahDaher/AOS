<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApiResponse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
      public static function success($data, $statusCode = 200)
    {
        return response()->json([
            'status' => true,
            'data' => $data
        ], $statusCode);
    }

    public static function error($message, $statusCode = 400)
    {
        return response()->json([
            'status' => false,
            'data' => ['message' => $message]
        ], $statusCode);
    }
}
