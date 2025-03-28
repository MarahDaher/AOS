<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function getAll()
    {
        return User::with('role')->get();
    }

    public function find($id)
    {
        return User::findOrFail($id);
    }

    public function create(array $data)
    {
        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

    public function update(int $id, array $data)
    {
        $user = $this->find($id);
        $user->update($data);
        return $user;
    }

    public function delete(int $id)
    {
        $user = $this->find($id);
        return $user->delete();
    }

    public function changePassword(int $userId, array $data)
    {
        $user = User::findOrFail($userId);
        $user->password = bcrypt($data['newPassword']);
        $user->save();

        return $user;
    }
}
