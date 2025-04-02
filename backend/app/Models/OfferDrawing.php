<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferDrawing extends Model
{
    public $timestamps = false;
    protected $fillable = ['offer_id', 'filename', 'url', 'upload_date'];

    protected $casts = [
        'upload_date' => 'datetime',
    ];

    protected $appends = ['preview_url'];

    public function getPreviewUrlAttribute(): string
    {
        return asset("storage/{$this->url}");
    }

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
