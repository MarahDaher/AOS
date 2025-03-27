<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'check.permission' => \App\Http\Middleware\CheckPermissions::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function (AuthorizationException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage() ?: 'You are not authorized to perform this action.',
            ], 403);
        });

        $exceptions->render(function (AuthenticationException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        });

        $exceptions->render(function (HttpException $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage() ?: 'HTTP error occurred.',
            ], $e->getStatusCode());
        });

        $exceptions->render(function (Throwable $e, Request $request) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage() ?: 'Server Error',
            ], 500);
        });
    })->create();
