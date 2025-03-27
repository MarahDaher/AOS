<?php

namespace App\Http\Controllers\Api;;

use App\Config\PermissionConstants;
use App\Http\Collections\UserCollection;
use App\Http\Controllers\BaseController;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\ApiResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        return ApiResponse::success(new UserCollection($this->userService->getAllUsers()));
    }


    public function show(int $id)
    {
        return ApiResponse::success(new UserResource($this->userService->getUserById($id)));
    }

    public function store(CreateUserRequest $request)
    {
        $createdUser = $this->userService->createUser($request->all());
        return ApiResponse::success(
            new UserResource($createdUser->load('role')),
            200
        );
    }

    public function update(UpdateUserRequest $request, int $id)
    {
        $updatedUser = $this->userService->updateUser($id, $request->all());
        return ApiResponse::success(
            new UserResource($updatedUser->load('role')),
            200
        );
    }

    public function destroy(int $id)
    {
        $this->userService->deleteUser($id);
        return ApiResponse::success(['message' => 'User deleted successfully'], 200);
    }


    public function changePassword(ChangePasswordRequest $request)
    {
        $userId = Auth::user()->id;

        $updatedUser = $this->userService->changePassword($userId, $request->validated());

        return ApiResponse::success([
            'message' => 'Password updated successfully',
            'user' => new UserResource($updatedUser),
        ]);
    }
}
