<?php

namespace App\Repositories;

use App\Models\RawMaterial;

class RawMaterialRepository
{
    public function getAll()
    {
        return RawMaterial::get();
    }

    public function getById(int $id)
    {
        return RawMaterial::findOrFail($id);
    }

    public function create(array $data)
    {
        return RawMaterial::create($data);
    }

    public function update(int $id, array $data)
    {
        return RawMaterial::findOrFail($id)->update($data);
    }
}
