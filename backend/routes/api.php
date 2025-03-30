<?php

use App\Config\PermissionConstants;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\OfferRawMaterialCalculatedController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RawMaterialController;
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

    //Offers
    Route::prefix('offers')->group(function () {
        Route::get('/', [OfferController::class, 'index'])->middleware('check.permission:' . PermissionConstants::VIEW_OFFERS);
        Route::get('{id}', [OfferController::class, 'show'])->middleware('check.permission:' . PermissionConstants::VIEW_OFFER);
        Route::post('/', [OfferController::class, 'store'])->middleware('check.permission:' . PermissionConstants::CREATE_OFFER);
        Route::patch('{id}', [OfferController::class, 'update'])->middleware('check.permission:' . PermissionConstants::UPDATE_OFFER);
        // Offer Raw Materials calculated
        Route::get('{id}/raw-materials-calculated', [OfferRawMaterialCalculatedController::class, 'index'])->middleware('check.permission:' . PermissionConstants::VIEW_OFFER_RAW_MATERIAL);
        Route::patch('{offerId}/raw-materials/{rawMaterialId}', [OfferRawMaterialCalculatedController::class, 'update'])->middleware('check.permission:' . PermissionConstants::UPDATE_OFFER_RAW_MATERIAL);;
    });

    // Raw Materials
    Route::prefix('raw-materials')->group(function () {
        Route::get('/', [RawMaterialController::class, 'index'])->middleware('check.permission:' . PermissionConstants::VIEW_RAW_MATERIALS);
        Route::get('{id}', [RawMaterialController::class, 'show'])->middleware('check.permission:' . PermissionConstants::VIEW_RAW_MATERIAL);
        Route::post('/', [RawMaterialController::class, 'store'])->middleware('check.permission:' . PermissionConstants::CREATE_RAW_MATERIAL);
        Route::patch('{id}', [RawMaterialController::class, 'update'])->middleware('check.permission:' . PermissionConstants::UPDATE_RAW_MATERIAL);
    });
});
