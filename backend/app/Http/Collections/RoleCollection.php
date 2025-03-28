<?php

namespace App\Http\Collections;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\RoleResource;

class RoleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($role) {
            return new RoleResource($role);
        })->toArray();
    }
}
