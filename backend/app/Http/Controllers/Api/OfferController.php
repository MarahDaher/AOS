<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResponse;
use App\Http\Collections\OfferCollection;
use App\Services\OfferService;

class OfferController extends Controller
{
    public function __construct(private OfferService $service) {}

    public function index()
    {
        return ApiResponse::success(new OfferCollection($this->service->getAllSummary()));
    }
}
