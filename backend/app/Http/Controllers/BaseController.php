<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BaseController extends Controller
{
    /**
     * Return a JSON response with the given data.
     */
    protected function respond($data, $statusCode = Response::HTTP_OK, $headers = []): JsonResponse
    {
        // Return the response with appropriate headers and status code
        return response()->json($data, $statusCode, $headers);
    }

    /**
     * Return a JSON response with an error message.
     */
    protected function respondError($message, $statusCode = Response::HTTP_NOT_FOUND)
    {
        return $this->respond($message, $statusCode);
    }
}
