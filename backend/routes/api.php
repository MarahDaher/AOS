<?php

use App\Config\PermissionConstants;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use Illuminate\Support\Facades\Route;
// Controllers

// Auth
Route::post('login', [AuthController::class, 'login']);
Route::get('user-profile', [AuthController::class, 'profile'])->middleware('auth:api');
Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
Route::get('/get-user-permissions', [PermissionController::class, 'getUserPermissions']);

// Routes
Route::middleware(['auth:api'])->group(function () {
    //Users
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->middleware('check.permission:' . PermissionConstants::VIEW_USERS);
        Route::get('{id}', [UserController::class, 'show'])->middleware('check.permission:' . PermissionConstants::VIEW_USER);
        Route::post('/', [UserController::class, 'store'])->middleware('check.permission:' . PermissionConstants::CREATE_USER);
        Route::put('{id}', [UserController::class, 'update'])->middleware('check.permission:' . PermissionConstants::UPDATE_USER);
        Route::delete('{id}', [UserController::class, 'destroy'])->middleware('check.permission:' . PermissionConstants::DELETE_USER);
        Route::post('/change-password', [UserController::class, 'changePassword'])->middleware('check.permission:' . PermissionConstants::CHANGE_USER_PASSWORD);
    });

    // Roles
    Route::prefix('roles')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->middleware('check.permission:' . PermissionConstants::VIEW_ROLES);
        Route::get('{id}', [RoleController::class, 'show'])->middleware('check.permission:' . PermissionConstants::VIEW_ROLE);
    });
});
