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
        $year = now()->year;
        $basePath = config('offer_drawings.base_path');
        $filename = $file->getClientOriginalName();

        $file->storeAs("{$basePath}/{$year}", $filename, 'public');

        return $this->repository->create([
            'offer_id' => $offer->id,
            'filename' => $filename,
            'upload_date' => now(),
        ]);
    }


    public function getLatestDrawing(Offer $offer): ?OfferDrawing
    {
        return $this->repository->getLatestByOffer($offer->id);
    }
}
