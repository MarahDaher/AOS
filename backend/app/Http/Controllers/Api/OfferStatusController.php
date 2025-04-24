<?php

namespace App\Http\Controllers\Api;

use App\Http\Collections\OfferStatusCollection;
use App\Http\Controllers\BaseController;
use App\Http\Resources\ApiResponse;
use App\Services\OfferStatusService;

class OfferStatusController extends BaseController
{
    protected OfferStatusService $offerStatusService;

    public function __construct(OfferStatusService $offerStatusService)
    {
        $this->offerStatusService = $offerStatusService;
    }

    public function index()
    {
        return ApiResponse::success(new OfferStatusCollection($this->offerStatusService->getAll()));
    }
}
