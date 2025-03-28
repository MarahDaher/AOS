<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Permission\CheckUserPermissionRequest;
use App\Http\Resources\BasicResource;
use App\Services\AuthService;
use App\Services\PermissionService;

class PermissionController extends BaseController
{
    //
    private PermissionService $permissionService;
    private AuthService $authService;

    public function __construct(PermissionService $permissionService, AuthService $authService)
    {
        $this->permissionService = $permissionService;
        $this->authService = $authService;
    }


    public function checkPermission(CheckUserPermissionRequest $request, int $userId)
    {
        return $this->respond($this->permissionService->checkPermission($request['permission'], $userId));
    }


    public function getUserPermissions()
    {
        $authenticatedUser = $this->authService->getUserProfile();
        return $this->respond(BasicResource::collection($this->permissionService->getUserPermissions($authenticatedUser)));
    }
}
