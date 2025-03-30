<?php

namespace App\Services;

use App\Models\RawMaterial;
use App\Repositories\RawMaterialRepository;
use Illuminate\Support\Str;

class RawMaterialService
{
    public function __construct(private RawMaterialRepository $repository) {}

    public function getAllMaterials()
    {
        return $this->repository->getAll();
    }

    public function getRawMaterialById(int $id)
    {
        return $this->repository->getById($id);
    }

    public function createRawMaterial(array $data)
    {
        $createdRawMaterial = $this->repository->create($data);

        return $createdRawMaterial;
    }

    public function updateRawMaterial(int $id, array $data)
    {
        $updatedRawMaterial = $this->repository->update($id, $data);

        return $updatedRawMaterial;
    }
}
