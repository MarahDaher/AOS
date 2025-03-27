<?php

namespace App\Http\Middleware;

use App\Http\Resources\ApiResponse;
use Illuminate\Support\Facades\Gate;
use Closure;
use Illuminate\Auth\Access\AuthorizationException;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $permission)
    {
        if (!Gate::allows($permission)) {
            throw new AuthorizationException('You do not have permission to ' . $permission . '.');
        }

        return $next($request);
    }
}
