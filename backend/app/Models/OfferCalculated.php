<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferCalculated extends Model
{
    protected $table = 'offers_calculated';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $guarded = [];


    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'general_created_by_user_id');
    }
}
