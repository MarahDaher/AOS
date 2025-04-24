<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OfferStatus extends Model
{
    use HasFactory;

    protected $table = 'offer_status';

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    // Optional: if you want to define a relationship back to offers
    public function offers()
    {
        return $this->hasMany(Offer::class, 'general_status_id');
    }
}
