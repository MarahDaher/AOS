<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferCalculatedWordExport extends Model
{
    protected $table = 'offers_calculated_wordexport';

    public $timestamps = false;

    protected $guarded = [];

    public function getKeyName()
    {
        return 'id'; // assuming the view includes an `id` field from `offers_calculated`
    }
}
