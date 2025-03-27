<?php

namespace App\Http\Collections;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\UserResource;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($clinic) {
            return new UserResource($clinic);
        })->toArray();
    }
}
