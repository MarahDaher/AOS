<?php


namespace App\Services;

use App\Models\Offer;
use App\Models\OfferDrawing;
use App\Repositories\OfferDrawingRepository;
use Illuminate\Http\UploadedFile;

class OfferDrawingService
{
    public function __construct(private OfferDrawingRepository $repository) {}

    public function storeDrawing(Offer $offer, UploadedFile $file): OfferDrawing
    {
        $filename = $file->getClientOriginalName();
        $path = $file->storeAs("offer_drawings/{$offer->id}", $filename, 'public');

        return $this->repository->create([
            'offer_id' => $offer->id,
            'filename' => $filename,
            'url' => $path,
            'upload_date' => now(),
        ]);
    }

    public function getLatestDrawing(Offer $offer): ?OfferDrawing
    {
        return $this->repository->getLatestByOffer($offer->id);
    }
}
