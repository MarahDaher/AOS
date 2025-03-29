<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferDrawing extends Model
{
    public $timestamps = false;
    protected $fillable = ['offer_id', 'filename', 'url', 'upload_date'];

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
