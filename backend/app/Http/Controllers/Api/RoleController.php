<?php

namespace App\Http\Controllers\Api;

use App\Http\Collections\RoleCollection;
use App\Http\Controllers\BaseController;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\RoleResource;
use App\Services\RoleService;

class RoleController extends BaseController
{
    //
    public function __construct(protected RoleService $roleService) {}


    public function index()
    {
        return ApiResponse::success(new RoleCollection($this->roleService->getAllRoles()));
    }

    public function show(int $id)
    {
        return ApiResponse::success(new RoleResource($this->roleService->getRoleById($id)));
    }
}
