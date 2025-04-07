<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferDrawingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'offer_id' => $this->offer_id,
            'filename' => $this->filename,
            'upload_date' => $this->upload_date?->format('Y-m-d'), // safe call + only date
            'preview_url' => $this->preview_url,
        ];
    }
}
