<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResponse;
use App\Models\Additive;

class AdditiveController extends BaseController
{
    //


    public function index()
    {
        $additives = Additive::all();

        return ApiResponse::success($additives);
    }
}
